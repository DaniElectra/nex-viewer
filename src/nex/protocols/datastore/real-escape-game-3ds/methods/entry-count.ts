import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'EntryCount';

	private applicationId = new UInt32();
	private sign = new UInt8();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.applicationId.extractFrom(stream);
		this.sign.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			applicationId: this.applicationId,
			sign: this.sign
		};
	}
}

// * No response data
export class Response {
	public static Name = 'EntryCount';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
