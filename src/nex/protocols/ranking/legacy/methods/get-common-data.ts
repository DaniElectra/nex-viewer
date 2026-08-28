import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Int16 from '@/nex/types/int16';
import RVBuffer from '@/nex/types/buffer';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetCommonData';

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
	public static Name = 'GetCommonData';

	private resultCode = new Int16();
	private commonData = new RVBuffer();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.resultCode.extractFrom(stream);
		this.commonData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			resultCode: this.resultCode,
			commonData: this.commonData
		};
	}
}
