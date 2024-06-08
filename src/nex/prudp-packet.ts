import ByteStream from '@/byte-stream';
import RMCMessage from '@/nex/rmc-message';
import Connection from '@/nex/connection';
import type { SerializedPRUDPPacket } from '@/types/nex/serialized-packet';

export default class PRUDPPacket {
	public readonly version: number;

	public fromClientToServer: boolean;
	public fromServerToClient: boolean;

	public sourceAddress: string;
	public sourcePort: number;
	public destinationAddress: string;
	public destinationPort: number;

	public sourceStreamID: number;
	public sourceStreamType: number;
	public destinationStreamID: number;
	public destinationStreamType: number;
	public flags: number;
	public type: number;
	public sessionID: number;
	public signature: Buffer;
	public sequenceID: number;
	public connectionSignature?: Buffer;
	public fragmentID?: number;
	public substreamID?: number;
	public payload?: Buffer;
	public decryptedPayload?: Buffer;
	public defragmentedPayload?: Buffer;
	public connection: Connection;
	public message?: RMCMessage;

	protected stream: ByteStream;

	static FLAGS = {
		ACK:       0x001,
		RELIABLE:  0x002,
		NEED_ACK:  0x004,
		HAS_SIZE:  0x008,
		MULTI_ACK: 0x200,
	};

	static TYPES = {
		SYN:        0,
		CONNECT:    1,
		DATA:       2,
		DISCONNECT: 3,
		PING:       4,
		USER:       5,
	};

	constructor(stream: ByteStream) {
		this.stream = stream;
	}

	protected validateVirtualPorts(): void {
		if (this.sourceStreamType === 0 || this.sourceStreamType > 11) {
			throw new Error('Invalid source stream type');
		}

		if (this.sourceStreamID === 0) {
			throw new Error('Invalid source stream ID');
		}

		if (this.destinationStreamType === 0 || this.destinationStreamType > 11) {
			throw new Error('Invalid destination stream type');
		}

		if (this.destinationStreamID === 0) {
			throw new Error('Invalid source stream ID');
		}

		if (this.sourceStreamID === this.destinationStreamID) {
			// * Likely a Quazal Net-Z packet
			// ! NOTE - This WILL catch valid connections if the client uses 14 connections (making the server and client both use port 1)
			throw new Error('Source and destination virtual ports are the same');
		}

		if (this.sourceStreamType === 1) {
			throw new Error('Source stream type is DO');
		}

		if (this.sourceStreamType === 5) {
			throw new Error('Source stream type is NAT');
		}

		if (this.destinationStreamType === 1) {
			throw new Error('Destination stream type is DO');
		}

		if (this.destinationStreamType === 5) {
			throw new Error('Destination stream type is NAT');
		}
	}

	private isType(type: number): boolean {
		return this.type === type;
	}

	private hasFlag(flag: number): boolean {
		return (this.flags & flag) !== 0;
	}

	public isTypeSyn(): boolean {
		return this.isType(PRUDPPacket.TYPES.SYN);
	}

	public isTypeConnect(): boolean {
		return this.isType(PRUDPPacket.TYPES.CONNECT);
	}

	public isTypeData(): boolean {
		return this.isType(PRUDPPacket.TYPES.DATA);
	}

	public isTypeDisconnect(): boolean {
		return this.isType(PRUDPPacket.TYPES.DISCONNECT);
	}

	public isTypePing(): boolean {
		return this.isType(PRUDPPacket.TYPES.PING);
	}

	public isTypeUser(): boolean {
		return this.isType(PRUDPPacket.TYPES.USER);
	}

	public hasFlagAck(): boolean {
		return this.hasFlag(PRUDPPacket.FLAGS.ACK);
	}

	public hasFlagReliable(): boolean {
		return this.hasFlag(PRUDPPacket.FLAGS.RELIABLE);
	}

	public hasFlagNeedAck(): boolean {
		return this.hasFlag(PRUDPPacket.FLAGS.NEED_ACK);
	}

	public hasFlagHasSize(): boolean {
		return this.hasFlag(PRUDPPacket.FLAGS.HAS_SIZE);
	}

	public hasFlagMultiAck(): boolean {
		return this.hasFlag(PRUDPPacket.FLAGS.MULTI_ACK);
	}

	public serialize(): SerializedPRUDPPacket {
		const serialized: SerializedPRUDPPacket = {
			version: this.version,
			source_address: this.sourceAddress,
			source_port: this.sourcePort,
			destination_address: this.destinationAddress,
			destination_port: this.destinationPort,
			source_stream_id: this.sourceStreamID,
			source_stream_type: this.serializeStreamType(this.sourceStreamType),
			destination_stream_id: this.destinationStreamID,
			destination_stream_type: this.serializeStreamType(this.destinationStreamType),
			type: this.serializeType(),
			flags: this.serializeFlags(),
			session_id: this.sessionID,
			signature: this.signature,
			sequence_id: this.sequenceID
		};

		if (this.connectionSignature) {
			serialized.connection_signature = this.connectionSignature;
		}

		if (this.payload) {
			serialized.payload = this.payload;
		}

		if (this.decryptedPayload) {
			serialized.decrypted_payload = this.decryptedPayload;
		}

		if (this.isTypeData()) {
			serialized.fragment_id = this.fragmentID;

			if (this.fragmentID === 0) {
				serialized.defragmented_payload = this.defragmentedPayload;
			}

			if (this.message) {
				serialized.message = this.message.toJSON();
			}
		}

		return serialized;
	}

	private serializeStreamType(streamType: number): string {
		switch(streamType) {
			case 1:
				return 'DO';
			case 2:
				return 'RV';
			case 3:
				return 'OldRVSec';
			case 4:
				return 'SBMGMT';
			case 5:
				return 'NAT';
			case 6:
				return 'SessionDiscovery';
			case 7:
				return 'NATEcho';
			case 8:
				return 'Routing';
			case 9:
				return 'Game';
			case 10:
				return 'RVSecure';
			case 11:
				return 'Relay';
		}

		throw new Error(`Unsupported stream type ${streamType}`);
	}

	private serializeType(): string {
		switch(this.type) {
			case 0:
				return 'SYN';
			case 1:
				return 'CONNECT';
			case 2:
				return 'DATA';
			case 3:
				return 'DISCONNECT';
			case 4:
				return 'PING';
			case 5:
				return 'USER';
		}

		throw new Error(`Unsupported packet type ${this.type}`);
	}

	private serializeFlags(): string[] {
		const flags: string[] = [];

		if (this.hasFlagAck()) {
			flags.push('ACK');
		}

		if (this.hasFlagReliable()) {
			flags.push('RELIABLE');
		}

		if (this.hasFlagNeedAck()) {
			flags.push('NEED_ACK');
		}

		if (this.hasFlagHasSize()) {
			flags.push('HAS_SIZE');
		}

		if (this.hasFlagMultiAck()) {
			flags.push('MULTI_ACK');
		}

		return flags;
	}
}