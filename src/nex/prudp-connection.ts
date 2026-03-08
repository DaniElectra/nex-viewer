import ByteStream from '@/byte-stream';
import settings from '@/settings';
import titles from '@/nex/titles';
import Substream from '@/nex/substream';
import RMCMessage from '@/nex/rmc-message';
import { keyDerivationOld, keyDerivationNew, Ticket } from '@/nex/kerberos';
import TicketGrantingProtocol from '@/nex/protocols/ticket-granting';
import type PRUDPPacket from '@/types/nex/prudp-packet';
import type StationURL from '@/nex/types/station-url';
import type { SerializedConnection, Title } from '@/types/nex/serialized-connection';

// * Represents an individual connection to a specific game server
export default class PRUDPConnection {
	public clientAddress?: string;
	public clientPort?: number;
	public serverAddress?: string;
	public serverPort?: number;

	public clientStreamType?: number;
	public clientStreamID?: number;
	public serverStreamType?: number;
	public serverStreamID?: number;
	public packets: PRUDPPacket[] = []; // * Stores all packets in the connection regardless of substream, reliability, etc. Used to display all packets in order as they are sent

	public title?: Title;

	public mainSecureStationTicket?: Ticket;
	public specialSecureStationTicket?: Ticket; // TODO - Currently unused. Also is this even accurate?
	public mainSecureStation?: StationURL;
	public specialSecureStation?: StationURL; // TODO - Currently unused
	public cipherKey: Buffer | string = 'CD&ML';
	public sessionKey: Buffer = Buffer.alloc(0);

	private clientSubstreams: Record<number, Substream> = {};
	private serverSubstreams: Record<number, Substream> = {};
	private serverConnectionSignature: Buffer = Buffer.alloc(0);
	private clientConnectionSignature: Buffer = Buffer.alloc(0);
	private ticketRequestPIDs: Record<number, bigint> = {}; // * Track the PIDs of users tickets are requested for with TicketGranting::RequestTicket. Key is the RMC call ID, value is PID

	private reset(): void {
		this.cipherKey = 'CD&ML';
		this.sessionKey = Buffer.alloc(0);

		this.clientSubstreams = {};
		this.serverSubstreams = {};
		this.serverConnectionSignature = Buffer.alloc(0);
		this.clientConnectionSignature = Buffer.alloc(0);
		this.ticketRequestPIDs = {};
	}

	private clientSubstream(substreamID: number): Substream {
		return this.substream(substreamID, true);
	}

	private serverSubstream(substreamID: number): Substream {
		return this.substream(substreamID, false);
	}

	private substream(substreamID: number, isClient: boolean): Substream {
		const substreams = isClient ? this.clientSubstreams : this.serverSubstreams;
		let substream = substreams[substreamID];

		// TODO - This is wrong. Only the first substream gets the original key. All other substreams get a modified key. Need to properly init these
		if (!substream) {
			substream = new Substream();
			substream.setKey(this.cipherKey);

			substreams[substreamID] = substream;
		}

		return substream;
	}

	public processPacket(packet: PRUDPPacket): void {
		try {
			if (packet.isTypeSyn() && packet.fromClientToServer && this.mainSecureStationTicket) {
				this.reset(); // * Assume a new connection has started
			}

			if (packet.isTypeSyn() && packet.fromServerToClient && packet.connectionSignature) {
				this.serverConnectionSignature = packet.connectionSignature;
			}

			if (packet.isTypeConnect() && packet.fromClientToServer && packet.connectionSignature) {
				this.clientConnectionSignature = packet.connectionSignature;
			}

			if ((packet.version !== -1 && packet.hasFlagAck()) || packet.hasFlagMultiAck()) {
				// TODO - Actually handle these?
				return;
			}

			if (packet.version !== -1 && packet.isTypeData() && !packet.hasFlagReliable()) {
				// * Packet is an unreliable DATA packet.
				// * These packets use their own RC4 stream
				// * and are not yet supported.
				return;
			}

			if (packet.isTypePing()) {
				// * Don't worry about handling PING packets
				return;
			}

			// TODO - DO packets uses a different algorithm compared to regular packets,
			// using the session key from the MatchmakeSession on the calculations of the signatures.
			// And on V0 checksums we don't even have that, the checksum is always calculated with an
			// access key sum of 0, regardless of game. Somehow handle that alongside the possibility
			// for the session host to change, which requires the console to disconnect from the
			// existing host and connect to the new one.
			//
			// For the time being, we're going to skip the signature checks and handle version
			// differences as best as we can.
			if (!this.title && packet.sourceStreamType !== 1) {
				for (const title of titles) {
					if (packet.version === -1) {
						if (title.titleIDs.includes(packet.titleID)) {
							this.title = title;
							break;
						}
					} else if (packet.version === 0) {
						const expectedChecksum = packet.checksum;
						const calculatedChecksum = packet.calculateChecksum(title.accessKey);

						if (expectedChecksum === calculatedChecksum) {
							this.title = title;
							break;
						}
					} else if (packet.version === 1) {
						// TODO - Legacy connection signature
						const connectionSignature = packet.fromClientToServer ? this.clientConnectionSignature : this.serverConnectionSignature;
						const expectedSignature = packet.signature;
						const calculatedSignature = packet.calculateSignature(title.accessKey, this.sessionKey, connectionSignature);

						if (expectedSignature.equals(calculatedSignature)) {
							this.title = title;
							break;
						}
					} else if (packet.version === 2) {
						const expectedSignature = packet.liteSignature;
						const calculatedSignature = packet.calculateSignature(title.accessKey, this.serverConnectionSignature);

						if (expectedSignature && expectedSignature.equals(calculatedSignature)) {
							this.title = title;
							break;
						}

						// * Fall back to checking the game server ID in case the above fails for whatever reason.
						// * Official PRUDPLite games connect to WebSocket servers with the game server ID in the
						// * domain, such as "g23380901-lp1.s.n.srv.nintendo.net" where "23380901" is the game
						// * server ID for Super Smash Bros. Ultimate
						if (packet.destinationAddress.trim().includes(title.gameServerID)) {
							this.title = title;
							break;
						}
					}
				}

				if (!this.title) {
					throw new Error('Failed to find title for network dump');
				}
			}

			let packets: PRUDPPacket[];
			const substreamID = packet.substreamID || 0;

			// * NAT packets always use a sequence ID of 0, since there is no SYN handshake.
			// * This doesn't work with the substreams, so skipping it
			if (packet.version !== -1 && packet.sourceStreamType !== 5) {
				const substream = packet.fromClientToServer ? this.clientSubstream(substreamID) : this.serverSubstream(substreamID);
				packets = substream.update(packet);
			} else {
				packets = [packet];
			}

			for (const packet of packets) {
				if (packet.isTypeData()) {
					// TODO - This whole section needs to be reworked to support different encryption and compression settings. Currently assumes RC4 and no compression
					let defragmentedPayload: Buffer | null = null;

					if (packet.version !== -1) {
						const substream = this.clientSubstream(substreamID);
						defragmentedPayload = substream.addFragment(packet);
					} else if (packet.payload) {
						defragmentedPayload = packet.payload;
					}

					if (packet.fragmentID === 0 && defragmentedPayload) {
						packet.defragmentedPayload = defragmentedPayload;
						if (!packet.isStreamTypeDO()) {
							this.processPacketMessage(packet);
						}
					}
				} else if (packet.isStreamTypeNAT()) {
					this.processNATPacketMessage(packet);
				}
			}
		} catch (error) {
			if (typeof error === 'string') {
				packet.stackTrace = error;
			} else if (error instanceof Error && error.stack) {
				packet.stackTrace = error.stack;
			} else if (error instanceof Error) {
				packet.stackTrace = JSON.stringify(error);
			} else {
				packet.stackTrace = `Unknown error type: ${error}`;
			}
		} finally {
			this.packets.push(packet);
		}
	}

	private processPacketMessage(packet: PRUDPPacket): void {
		packet.message = new RMCMessage(packet.defragmentedPayload!);
		packet.message.connection = this;

		if (packet.message.error) {
			const substreamID = packet.substreamID || 0;
			const requestPacket = this.packets.find((p) => {
				if (
					p.substreamID === substreamID &&
					p.message?.type === RMCMessage.REQUEST &&
					p.message?.protocolID === packet.message?.protocolID &&
					p.message?.callID === packet.message?.callID
				) {
					return true;
				}

				return false;
			});

			if (requestPacket && requestPacket.message) {
				packet.message.methodID = requestPacket.message.methodID;

				if (requestPacket.message.methodName) {
					packet.message.methodName = requestPacket.message.methodName;
				} else {
					packet.message.methodName = 'UnknownMethod';
				}
			}
		}

		const protocol = this.title!.getProtocolHandler(packet.message);

		if (protocol) {
			packet.message.protocolName = protocol.Name;

			if (!packet.message.error) {
				protocol.handlePacket(packet);
			}
		} else {
			const protocolID = packet.message.extendedProtocolID ? packet.message.extendedProtocolID : packet.message.protocolID;

			packet.message.protocolName = `UnknownProtocol_0x${protocolID.toString(16).toUpperCase().padStart(2, '0')}`;
			packet.message.methodName = `UnknownMethod_0x${packet.message.methodID.toString(16).toUpperCase().padStart(2, '0')}`;
		}

		// TODO - Skip this for PRUDPLite? This is only really done because payloads are encrypted and we need the key from the ticket, but Switch payloads aren't encrypted
		if (packet.message.protocolID === TicketGrantingProtocol.ID && !packet.message.error) {
			// TODO - Add LoginWithContext/ValidateAndRequestTicketWithParam support here?
			const methodID = packet.message.methodID;

			if (
				(methodID === TicketGrantingProtocol.Methods.Login || methodID === TicketGrantingProtocol.Methods.LoginEx) &&
				packet.message.type === RMCMessage.RESPONSE
			) {
				if (packet.message.parameters.retval.isSuccess()) {
					const sourcePID = packet.message.parameters.pidPrincipal.value;
					const ticketData = packet.message.parameters.pbufResponse.value;

					this.mainSecureStation = packet.message.parameters.pConnectionData.m_urlRegularProtocols;
					this.specialSecureStation = packet.message.parameters.pConnectionData.m_urlSpecialProtocols;

					this.processKerberosTicket(ticketData, sourcePID, '');
				}
			}

			if (methodID === TicketGrantingProtocol.Methods.RequestTicket && packet.message.type === RMCMessage.REQUEST) {
				this.ticketRequestPIDs[packet.message.callID] = packet.message.parameters.idSource.value;
			}

			if (methodID === TicketGrantingProtocol.Methods.RequestTicket && packet.message.type === RMCMessage.RESPONSE) {
				// TODO - Error when not found
				// TODO - RequestTicket also has a retval, is it treated the same as Login/LoginEx?
				if (this.ticketRequestPIDs[packet.message.callID]) {
					const sourcePID = this.ticketRequestPIDs[packet.message.callID];
					const ticketData = packet.message.parameters.bufResponse.value;
					const sourceKey = packet.message.parameters.pSourceKey?.value ? packet.message.parameters.pSourceKey.value : '';

					delete this.ticketRequestPIDs[packet.message.callID];

					this.processKerberosTicket(ticketData, sourcePID, sourceKey);
				}
			}
		}
	}

	private processNATPacketMessage(packet: PRUDPPacket): void {
		const stream = new ByteStream(packet.payload!);
		packet.natMessageID = stream.readUInt8();
		packet.natConnectionID = stream.readUInt32LE();
		packet.natTime = stream.readUInt64LE();
	}

	private processKerberosTicket(ticketData: Buffer, sourcePID: bigint, sourceKey: string): void {
		let key: Buffer = Buffer.from(sourceKey, 'hex');

		if (key.length === 0) {
			const account = settings.accounts().find(({ pid }) => BigInt(pid) === sourcePID);

			if (!account) {
				throw new Error(`No account found for PID ${sourcePID}`);
			}

			if (this.title?.settings.kerberos_key_version === 0) {
				if (account.password_hash_old) {
					key = Buffer.from(account.password_hash_old, 'hex');
				} else if (account.password) {
					key = keyDerivationOld(sourcePID, account.password);
					account.password_hash_old = key.toString('hex').toUpperCase();
				} else {
					throw new Error(`Title ${this.title.name} uses old Kerberos key derivation and no password is set for PID ${sourcePID}`);
				}
			} else {
				if (account.password_hash_new) {
					key = Buffer.from(account.password_hash_new, 'hex');
				} else if (account.password) {
					key = keyDerivationNew(sourcePID, account.password);
					account.password_hash_new = key.toString('hex').toUpperCase();
				} else {
					throw new Error(`Title ${this.title?.name} uses new Kerberos key derivation and no password is set for PID ${sourcePID}`);
				}
			}

			settings.save();
		}

		const ticket = new Ticket(ticketData, key, this.title!);

		// TODO - Is this accurate to how special stations are handled?
		const mainTarget = BigInt(this.mainSecureStation?.getParam('PID') || 0);
		const specialTarget = BigInt(this.specialSecureStation?.getParam('PID') || 0);

		if (mainTarget === ticket.target.value) {
			this.mainSecureStationTicket = ticket;
		}

		if (specialTarget === ticket.target.value) {
			this.specialSecureStationTicket = ticket;
		}
	}

	toJSON(): SerializedConnection {
		return {
			title: this.title!
		};
	}
}
