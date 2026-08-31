import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Int16 from '@/nex/types/int16';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetSpecificPeriodTotal';

	private category = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.category.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			category: this.category
		};
	}
}

export class Response {
	public static Name = 'GetSpecificPeriodTotal';

	private resultCode = new Int16();
	private totalCount = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.resultCode.extractFrom(stream);
		this.totalCount.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			resultCode: this.resultCode,
			totalCount: this.totalCount
		};
	}
}
