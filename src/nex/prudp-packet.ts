import type ByteStream from '@/byte-stream';
import type RMCMessage from '@/nex/rmc-message';
import type PRUDPConnection from '@/nex/prudp-connection';

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
		RAW: 7,
		UNKNOWN_8: 8 // * Only seen in some Switch games. Seems to be a new PING packet type? Functions identically to PING packets but with a separate sequence counter
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

	protected serializeStreamType(streamType: number): string {
		// * Raw RMC packets have no VirtualPorts
		if (this.version === -1) {
			return '';
		}

		switch (streamType) {
			case PRUDPPacket.STREAM_TYPES.DO:
				return 'DO';
			case PRUDPPacket.STREAM_TYPES.RV:
				return 'RV';
			case PRUDPPacket.STREAM_TYPES.OLDRVSEC:
				return 'OldRVSec';
			case PRUDPPacket.STREAM_TYPES.SBMGMT:
				return 'SBMGMT';
			case PRUDPPacket.STREAM_TYPES.NAT:
				return 'NAT';
			case PRUDPPacket.STREAM_TYPES.SESSIONDISCOVERY:
				return 'SessionDiscovery';
			case PRUDPPacket.STREAM_TYPES.NATECHO:
				return 'NATEcho';
			case PRUDPPacket.STREAM_TYPES.ROUTING:
				return 'Routing';
			case PRUDPPacket.STREAM_TYPES.GAME:
				return 'Game';
			case PRUDPPacket.STREAM_TYPES.RVSECURE:
				return 'RVSecure';
			case PRUDPPacket.STREAM_TYPES.RELAY:
				return 'Relay';
		}

		return `UnknownStreamType_${streamType}`;
	}

	protected serializeType(): string {
		// * Raw RMC packets have no VirtualPorts
		if (this.version === -1) {
			return '';
		}

		switch (this.type) {
			case PRUDPPacket.TYPES.SYN:
				return 'SYN';
			case PRUDPPacket.TYPES.CONNECT:
				return 'CONNECT';
			case PRUDPPacket.TYPES.DATA:
				return 'DATA';
			case PRUDPPacket.TYPES.DISCONNECT:
				return 'DISCONNECT';
			case PRUDPPacket.TYPES.PING:
				return 'PING';
			case PRUDPPacket.TYPES.USER:
				return 'USER';
			case PRUDPPacket.TYPES.ROUTE:
				return 'ROUTE';
			case PRUDPPacket.TYPES.RAW:
				return 'RAW';
			case PRUDPPacket.TYPES.UNKNOWN_8:
				return 'PING_8';
		}

		return `UnknownPacketType_${this.type}`;
	}

	protected serializeFlags(): string[] {
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
