import NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import Int16 from '@/nex/types/int16';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UnknownMethod0x8';

	private uniqueID = new UInt32();
	private unknown = new UInt8();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uniqueID.extractFrom(stream);
		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uniqueID: this.uniqueID,
			unknown: this.unknown
		};
	}
}

export class Response {
	public static Name = 'UnknownMethod0x8';

	private resultCode = new Int16();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.resultCode.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			resultCode: this.resultCode
		};
	}
}
