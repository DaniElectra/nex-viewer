import EventEmitter from 'node:events';
import path from 'node:path';
import fs from 'fs-extra';
import ByteStream from '@/byte-stream';
import PCAPParser from '@/pcap-parser';
import PCAPNGParser from '@/pcapng-parser';
import Connection from '@/nex/connection';
import PRUDPPacketV1 from '@/nex/prudp-packetv1';
import PRUDPPacketV0 from '@/nex/prudp-packetv0';
import RawRMCPacket from '@/nex/raw-rmc-packet';
import type Frame from '@/types/frame';
import type Packet from '@/types/nex/packet';
import type UDPPacket from '@/types/nex/udp-packet';

function int2ip(int: number): string {
	return `${int >>> 24}.${int >> 16 & 255}.${int >> 8 & 255}.${int & 255}`;
}

// * Parses network dumps for NEX/Rendez-Vous connections
export default class Session extends EventEmitter {
	private connections: Connection[] = [];
	private rawRMCMode = false;
	private lastPacketTime = 0;
	private elapsedTime = 0;

	constructor() {
		super();
	}

	public parse(capturePath: string): void {
		const extension = path.extname(capturePath);

		if (extension !== '.pcapng' && extension !== '.pcap') {
			throw new Error(`Invalid file type. Got ${extension}, expected .pcapng or .pcap`);
		}

		const captureData = fs.readFileSync(capturePath);
		let parser;

		const magic = captureData.readUInt32LE();

		if (magic === 0xA1B2C3D4 || magic === 0xD4C3B2A1) {
			parser = new PCAPParser(captureData);
		} else if (magic === 0x0A0D0D0A) {
			parser = new PCAPNGParser(captureData);
		} else {
			throw new Error('Invalid capture');
		}

		for (const packet of parser.packets()) {
			let time = 0;
			if ('timestamp' in packet) {
				if (this.lastPacketTime !== 0) {
					this.elapsedTime += packet.timestamp.seconds - this.lastPacketTime;
					time = this.elapsedTime;
				}

				this.lastPacketTime = packet.timestamp.seconds;
			}

			this.handlePacket(packet, time);
		}

		this.emit('finished', this.connections);
	}

	private handlePacket(frame: Frame, time?: number): void {
		// * HokakuCTR produces dumps whose payloads are:
		// * - u8  Revision (1)
		// * - u64 Title ID
		// * By checking if the first byte is a supported
		// * revision and that the following u64 is a 3DS
		// * title we can be reasonably sure the dump is
		// * a HokakuCTR dump.
		// * We only need the first 3 bytes of the u64
		if (!this.rawRMCMode && frame.data[0] === 1 && (frame.data.readBigUInt64LE(1) & 0xFFFFFF0000000000n) === 0x0004000000000000n) {
			this.rawRMCMode = true;
		}

		const packets = this.filterValidPackets(frame);

		for (const packet of packets) {
			this.processPacket(packet);

			if (!this.rawRMCMode) {
				packet.time = time;
			}

			this.emit('packet', packet);
		}
	}

	private filterValidPackets(frame: Frame): Packet[] {
		// * Not all packets in the network dumps are packets we care about
		const packets: Packet[] = [];

		try {
			if (this.rawRMCMode) {
				// * Raw RMC packets only include one packet per frame
				packets.push(new RawRMCPacket(new ByteStream(frame.data)));
			} else {
				const udpPacket = this.parseUDPPacket(frame.data);

				if (!udpPacket) {
					return packets;
				}

				const stream = new ByteStream(udpPacket.payload);

				// * Some PRUDP packets are bundled together. Need to split them apart
				while (stream.hasDataLeft()) {
					let packet: Packet;

					const magic = stream.readBytes(0x2);
					stream.skip(-0x2); // * Skip back to realign the stream position

					if (magic.equals(PRUDPPacketV1.Magic)) {
						packet = new PRUDPPacketV1(stream);
					} else {
						// * Assume packet is v0 and just Try It
						// *
						// * THIS IS *EXPECTED* TO FAIL OFTEN!
						// * PRUDPv0 DOES NOT HAVE A MAGIC LIKE v1!
						// * OUR BEST OPTION IS TO JUST GUESS

						packet = new PRUDPPacketV0(stream);
					}

					packet.sourceAddress = udpPacket.source;
					packet.sourcePort = udpPacket.sourcePort;
					packet.destinationAddress = udpPacket.destination;
					packet.destinationPort = udpPacket.destinationPort;

					packets.push(packet);
				}
			}
		} catch {
			// * Eat errors
		}

		return packets;
	}

	private parseUDPPacket(data: Buffer): UDPPacket | undefined {
		const stream = new ByteStream(data);

		const versionAndHeaderLength = stream.readUInt8();
		const version = (versionAndHeaderLength >> 4) & 0x0F;

		// * All packets we care about are
		// * assumed to be IPv4
		if (version !== 4) {
			return;
		}

		const headerLength = (versionAndHeaderLength & 0x0F) * 4;

		stream.skip(1); // * Service type
		const totalLength = stream.readUInt16BE();
		stream.skip(2); // * Identification
		stream.skip(2); // * Flags and fragment offset. Fragment offset is the last 13 bits (& 0x1FFF)
		stream.skip(1); // * Time to live
		const protocol = stream.readUInt8();
		stream.skip(2); // * Checksum

		const source = int2ip(stream.readUInt32BE());
		const destination = int2ip(stream.readUInt32BE());

		// TODO - Add this back with the new offsets
		//if (frame.subarray(17, 20).equals(XID_MAGIC)) {
		//	return;
		//}

		// * UDP protocol
		if (protocol !== 0x11) {
			return;
		}

		const udpLength = totalLength - headerLength;
		const udpStream = new ByteStream(stream.readBytes(udpLength));

		// * Parse UDP header
		const sourcePort = udpStream.readUInt16BE();
		const destinationPort = udpStream.readUInt16BE();
		const udpPacketLength = udpStream.readUInt16BE();

		if (udpPacketLength !== udpLength) {
			throw new Error(`Got bad UDP packet length. Expected ${udpLength}, got ${udpPacketLength}`);
		}

		udpStream.skip(0x2); // * Checksum

		const payload = udpStream.readBytes(udpLength - 0x8);

		return {
			source,
			destination,
			sourcePort,
			destinationPort,
			payload
		};
	}

	private processPacket(packet: Packet): void {
		let connection = this.findConnection(packet);

		if (!connection) {
			if (packet.version !== -1 && !packet.isTypeSyn()) {
				// * If we find a new connection on a packet besides the SYN,
				// * assume only part of the connection is present and ignore
				return;
			}

			if (packet.version !== -1 && packet.isTypeSyn() && packet.hasFlagAck()) {
				// * If the packet is a SYN but is the *ACK* of the SYN,
				// * assume only part of the connection is present and ignore
				return;
			}

			connection = new Connection();

			connection.clientAddress = packet.sourceAddress;
			connection.clientPort = packet.sourcePort;
			connection.serverAddress = packet.destinationAddress;
			connection.serverPort = packet.destinationPort;

			connection.clientStreamType = packet.sourceStreamType;
			connection.clientStreamID = packet.sourceStreamID;
			connection.serverStreamType = packet.destinationStreamType;
			connection.serverStreamID = packet.destinationStreamID;

			// TODO - Link special secure station as well, not just the main secure station
			for (const otherConnection of this.connections) {
				if (otherConnection.mainSecureStation && otherConnection.mainSecureStationTicket) {
					const address = otherConnection.mainSecureStation.getParam('address');
					const port = Number(otherConnection.mainSecureStation.getParam('port'));
					const streamType = Number(otherConnection.mainSecureStation.getParam('stream'));
					const streamID = Number(otherConnection.mainSecureStation.getParam('sid'));

					if (isNaN(port)) {
						continue;
					}

					if (isNaN(streamType)) {
						continue;
					}

					if (isNaN(streamID)) {
						continue;
					}

					if (connection.serverAddress !== address) {
						continue;
					}

					if (connection.serverPort !== port) {
						continue;
					}

					if (connection.serverStreamType !== streamType) {
						continue;
					}

					if (connection.serverStreamID !== streamID) {
						continue;
					}

					connection.title = otherConnection.title;
					connection.cipherKey = otherConnection.mainSecureStationTicket.sessionKey;
					connection.sessionKey = otherConnection.mainSecureStationTicket.sessionKey;
				}
			}

			this.connections.push(connection);
		}

		packet.connection = connection;

		connection.processPacket(packet);
	}

	private findConnection(packet: Packet): Connection | undefined {
		return this.connections.find(connection => {
			if (
				connection.clientAddress === packet.sourceAddress &&
				connection.clientPort === packet.sourcePort &&
				connection.serverAddress === packet.destinationAddress &&
				connection.serverPort === packet.destinationPort &&
				connection.clientStreamType === packet.sourceStreamType &&
				connection.clientStreamID === packet.sourceStreamID &&
				connection.serverStreamType === packet.destinationStreamType &&
				connection.serverStreamID === packet.destinationStreamID
			) {
				packet.fromClientToServer = true;
				packet.fromServerToClient = false;
				return connection;
			}

			if (
				connection.clientAddress === packet.destinationAddress &&
				connection.clientPort === packet.destinationPort &&
				connection.serverAddress === packet.sourceAddress &&
				connection.serverPort === packet.sourcePort &&
				connection.clientStreamType === packet.destinationStreamType &&
				connection.clientStreamID === packet.destinationStreamID &&
				connection.serverStreamType === packet.sourceStreamType &&
				connection.serverStreamID === packet.sourceStreamID
			) {
				packet.fromClientToServer = false;
				packet.fromServerToClient = true;
				return connection;
			}
		});
	}
}