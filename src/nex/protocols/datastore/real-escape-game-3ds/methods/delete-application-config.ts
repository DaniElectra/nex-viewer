import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeleteApplicationConfig';

	private applicationId = new UInt32();
	private key = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.applicationId.extractFrom(stream);
		this.key.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			applicationId: this.applicationId,
			key: this.key
		};
	}
}

// * No response data
export class Response {
	public static Name = 'DeleteApplicationConfig';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
