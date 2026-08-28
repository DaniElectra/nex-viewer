import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Int16 from '@/nex/types/int16';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeleteAllScore';

	private uniqueID = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uniqueID.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uniqueID: this.uniqueID
		};
	}
}

export class Response {
	public static Name = 'DeleteAllScore';

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
