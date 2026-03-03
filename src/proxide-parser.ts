import { decode } from '@msgpack/msgpack';
import ByteStream from '@/byte-stream';

export enum SessionEventType {
	NewConnection = 0,
	NewRequest = 1,
	NewResponse = 2,
	MessageData = 3,
	MessageDone = 4,
	RequestDone = 5,
	ConnectionDone = 6
}

export enum Protocol {
	Connect = 0,
	TLS = 1,
	HTTP2 = 2
}

export enum RequestPart {
	Request = 0,
	Response = 1
}

export enum Status {
	InProgress = 0,
	Succeeded = 1,
	Failed = 2
}

export interface SystemTime {
	seconds: number;
	nanoseconds: number;
}

export interface NewConnectionEvent {
	type: SessionEventType.NewConnection;
	uuid: string;
	protocolStack: Protocol[];
	clientAddress: string;
	timestamp: SystemTime;
}

export interface NewRequestEvent {
	type: SessionEventType.NewRequest;
	connectionUUID: string;
	uuid: string;
	uri: string;
	method: string;
	headers: Record<string, string>;
	timestamp: SystemTime;
}

export interface NewResponseEvent {
	type: SessionEventType.NewResponse;
	connectionUUID: string;
	requestUUID: string;
	headers: Record<string, string>;
	timestamp: SystemTime;
}

export interface MessageDataEvent {
	type: SessionEventType.MessageData;
	requestUUID: string;
	data: Buffer;
	part: RequestPart;
}

export interface MessageDoneEvent {
	type: SessionEventType.MessageDone;
	requestUUID: string;
	part: RequestPart;
	status: Status;
	timestamp: SystemTime;
	trailers: Record<string, string>;
}

export interface RequestDoneEvent {
	type: SessionEventType.RequestDone;
	requestUUID: string;
	status: Status;
	timestamp: SystemTime;
}

export interface ConnectionDoneEvent {
	type: SessionEventType.ConnectionDone;
	connectionUUID: string;
	status: Status;
	timestamp: SystemTime;
}

export interface ProxideTransaction {
	uuid: string;
	connectionUUID: string;
	clientAddress: string;
	uri: string;
	method: string;
	requestHeaders: Record<string, string>;
	responseHeaders: Record<string, string>;
	requestBody: Buffer;
	responseBody: Buffer;
	trailers: Record<string, string>;
	status: Status;
	startTime: SystemTime;
	endTime: SystemTime;
}

export type SessionEvent = NewConnectionEvent | NewRequestEvent | NewResponseEvent | MessageDataEvent | MessageDoneEvent | RequestDoneEvent | ConnectionDoneEvent;

const MAGIC_CAPTURE = 'PROXIDE-CAPTURE';
const VERSION = 'v02';

// TODO - This only parses PROXIDE-CAPTUREv02 files. PROXIDE-SESSIONv01 is not supported
export default class ProxideParser {
	private buffer: Buffer;
	private stream: ByteStream;

	public magic!: string;
	public version!: string;

	constructor(buffer: Buffer) {
		this.buffer = buffer;
		this.stream = new ByteStream(this.buffer);

		this.parseHeader();
	}

	private parseHeader(): void {
		const magic = this.stream.readBytes(15).toString('ascii');

		if (magic !== MAGIC_CAPTURE) {
			throw new Error(`Invalid Proxide magic. Expected "${MAGIC_CAPTURE}", got "${magic}"`);
		}

		const version = this.stream.readBytes(3).toString('ascii');

		if (version !== VERSION) {
			throw new Error(`Unsupported Proxide version. Expected "${VERSION}", got "${version}"`);
		}

		this.magic = magic;
		this.version = version;
	}

	private readVarint(): number {
		let result = 0;
		let shift = 0;

		while (true) {
			const byte = this.stream.readUInt8();
			result |= (byte & 0x7F) << shift;

			if ((byte & 0x80) === 0) {
				break;
			}

			shift += 7;
		}

		return result;
	}

	private decodeEnumMap(value: unknown): number {
		// * Proxide encodes enums as a single-key map like { "1": null }
		const entries = Object.entries(value as Record<string, null>);

		if (entries.length !== 1) {
			throw new Error(`Expected single-key enum map, got ${entries.length} keys`);
		}

		return parseInt(entries[0][0], 10);
	}

	private decodeSystemTime(value: unknown): SystemTime {
		const [seconds, nanoseconds] = value as [number, number];

		return {
			seconds,
			nanoseconds
		};
	}

	private decodeEvent(raw: unknown): SessionEvent {
		// * Each message is a one-element array: [{ "<type>": [...args] }]
		const wrapper = raw as Record<string, unknown[]>;
		const entries = Object.entries(wrapper);

		if (entries.length !== 1) {
			throw new Error(`Expected single-key event wrapper, got ${entries.length} keys`);
		}

		const eventType = parseInt(entries[0][0], 10) as SessionEventType;
		const args = entries[0][1];

		switch (eventType) {
			case SessionEventType.NewConnection:
				return {
					type: SessionEventType.NewConnection,
					uuid: args[0] as string,
					protocolStack: (args[1] as Record<string, null>[]).map(entry => this.decodeEnumMap(entry)),
					clientAddress: args[2] as string,
					timestamp: this.decodeSystemTime(args[3])
				};

			case SessionEventType.NewRequest:
				return {
					type: SessionEventType.NewRequest,
					connectionUUID: args[0] as string,
					uuid: args[1] as string,
					uri: args[2] as string,
					method: args[3] as string,
					headers: args[4] as Record<string, string>,
					timestamp: this.decodeSystemTime(args[5])
				};

			case SessionEventType.NewResponse:
				return {
					type: SessionEventType.NewResponse,
					connectionUUID: args[0] as string,
					requestUUID: args[1] as string,
					headers: args[2] as Record<string, string>,
					timestamp: this.decodeSystemTime(args[3])
				};

			case SessionEventType.MessageData:
				return {
					type: SessionEventType.MessageData,
					requestUUID: args[0] as string,
					data: Buffer.from(args[1] as Uint8Array),
					part: this.decodeEnumMap(args[2])
				};

			case SessionEventType.MessageDone:
				return {
					type: SessionEventType.MessageDone,
					requestUUID: args[0] as string,
					part: this.decodeEnumMap(args[1]),
					status: this.decodeEnumMap(args[2]),
					timestamp: this.decodeSystemTime(args[3]),
					trailers: args[4] as Record<string, string>
				};

			case SessionEventType.RequestDone:
				return {
					type: SessionEventType.RequestDone,
					requestUUID: args[0] as string,
					status: this.decodeEnumMap(args[1]),
					timestamp: this.decodeSystemTime(args[2])
				};

			case SessionEventType.ConnectionDone:
				return {
					type: SessionEventType.ConnectionDone,
					connectionUUID: args[0] as string,
					status: this.decodeEnumMap(args[1]),
					timestamp: this.decodeSystemTime(args[2])
				};

			default:
				throw new Error(`Unknown SessionEvent type: ${eventType}`);
		}
	}

	public* events(): Generator<SessionEvent> {
		while (this.stream.hasDataLeft()) {
			const length = this.readVarint();
			const bytes = this.stream.readBytes(length);

			yield this.decodeEvent(decode(bytes));
		}
	}
}
