import type ByteStream from '@/byte-stream';
import type RMCMessage from '@/nex/rmc-message';
import type PRUDPConnection from '@/nex/prudp-connection';
import type { SerializedPRUDPPacket } from '@/types/nex/serialized-packet';

export default class PRUDPPacket {
	public elapsedTime?: number;
	public readonly version!: number;
	public originalBuffer!: Buffer;

	public fromClientToServer!: boolean;
	public fromServerToClient!: boolean;

	public sourceAddress!: string;
	public sourcePort!: number;
	public destinationAddress!: string;
	public destinationPort!: number;

	public sourceStreamID!: number;
	public sourceStreamType!: number;
	public destinationStreamID!: number;
	public destinationStreamType!: number;
	public flags!: number;
	public type!: number;
	public sessionID!: number;
	public signature!: Buffer;
	public sequenceID!: number;
	public connectionSignature?: Buffer;
	public fragmentID?: number;
	public substreamID?: number;
	public payload?: Buffer;
	public decryptedPayload?: Buffer;
	public defragmentedPayload?: Buffer;
	public connection?: PRUDPConnection;
	public message?: RMCMessage;
	public stackTrace?: string;

	// * Fields exclusive to NAT packets
	public natMessageID?: number;
	public natConnectionID?: number;
	public natTime?: bigint;

	protected stream: ByteStream;

	static FLAGS = {
		ACK: 0x001,
		RELIABLE: 0x002,
		NEED_ACK: 0x004,
		HAS_SIZE: 0x008,
		MULTI_ACK: 0x200
	};

	static TYPES = {
		SYN: 0,
		CONNECT: 1,
		DATA: 2,
		DISCONNECT: 3,
		PING: 4,
		USER: 5,
		ROUTE: 6,
		RAW: 7
	};

	static STREAM_TYPES = {
		DO: 1,
		RV: 2,
		OLDRVSEC: 3,
		SBMGMT: 4,
		NAT: 5,
		SESSIONDISCOVERY: 6,
		NATECHO: 7,
		ROUTING: 8,
		GAME: 9,
		RVSECURE: 10,
		RELAY: 11
	};

	constructor(stream: ByteStream) {
		this.stream = stream;
	}

	private isType(type: number): boolean {
		return this.type === type;
	}

	private hasFlag(flag: number): boolean {
		return (this.flags & flag) !== 0;
	}

	private isStreamType(type: number): boolean {
		return this.sourceStreamType === type;
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

	public isTypeRoute(): boolean {
		return this.isType(PRUDPPacket.TYPES.ROUTE);
	}

	public isTypeRaw(): boolean {
		return this.isType(PRUDPPacket.TYPES.RAW);
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

	public isStreamTypeDO(): boolean {
		return this.isStreamType(PRUDPPacket.STREAM_TYPES.DO);
	}

	public isStreamTypeRV(): boolean {
		return this.isStreamType(PRUDPPacket.STREAM_TYPES.RV);
	}

	public isStreamTypeOldRVSec(): boolean {
		return this.isStreamType(PRUDPPacket.STREAM_TYPES.OLDRVSEC);
	}

	public isStreamTypeSBMGMT(): boolean {
		return this.isStreamType(PRUDPPacket.STREAM_TYPES.SBMGMT);
	}

	public isStreamTypeNAT(): boolean {
		return this.isStreamType(PRUDPPacket.STREAM_TYPES.NAT);
	}

	public isStreamTypeSessionDiscovery(): boolean {
		return this.isStreamType(PRUDPPacket.STREAM_TYPES.SESSIONDISCOVERY);
	}

	public isStreamTypeNATEcho(): boolean {
		return this.isStreamType(PRUDPPacket.STREAM_TYPES.NATECHO);
	}

	public isStreamTypeRouting(): boolean {
		return this.isStreamType(PRUDPPacket.STREAM_TYPES.ROUTING);
	}

	public isStreamTypeGame(): boolean {
		return this.isStreamType(PRUDPPacket.STREAM_TYPES.GAME);
	}

	public isStreamTypeRVSecure(): boolean {
		return this.isStreamType(PRUDPPacket.STREAM_TYPES.RVSECURE);
	}

	public isStreamTypeRelay(): boolean {
		return this.isStreamType(PRUDPPacket.STREAM_TYPES.RELAY);
	}

	public serialize(): SerializedPRUDPPacket {
		const serialized: SerializedPRUDPPacket = {
			id: -1,
			elapsed_time: this.elapsedTime,
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
			signature: this.signature ? [...this.signature.values()] : [], // * Raw RMC packets have no signature
			sequence_id: this.sequenceID,
			original_buffer: [...this.originalBuffer.values()]
		};

		if (this.connectionSignature) {
			serialized.connection_signature = [...this.connectionSignature.values()];
		}

		if (this.payload) {
			serialized.payload = [...this.payload.values()];
		}

		if (this.decryptedPayload) {
			serialized.decrypted_payload = [...this.decryptedPayload.values()];
		}

		if (this.isTypeData()) {
			serialized.fragment_id = this.fragmentID;

			if (this.fragmentID === 0 && this.defragmentedPayload) {
				serialized.defragmented_payload = [...this.defragmentedPayload.values()];
			}

			if (this.message) {
				serialized.message = this.message.toJSON();
			}
		}

		// * NAT-exclusive fields
		if (this.isStreamTypeNAT()) {
			serialized.nat_message_id = this.natMessageID;
			serialized.nat_connection_id = this.natConnectionID;
			serialized.nat_time = this.natTime;
		}

		if (this.stackTrace) {
			serialized.stack_trace = this.stackTrace;
		}

		return serialized;
	}

	private serializeStreamType(streamType: number): string {
		// * Raw RMC packets have no VirtualPorts
		if (this.version === -1) {
			return '';
		}

		switch (streamType) {
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

		return `UnknownStreamType_${streamType}`;
	}

	private serializeType(): string {
		// * Raw RMC packets have no VirtualPorts
		if (this.version === -1) {
			return '';
		}

		switch (this.type) {
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
			case 6:
				return 'ROUTE';
			case 7:
				return 'RAW';
		}

		return `UnknownPacketType_${this.type}`;
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
