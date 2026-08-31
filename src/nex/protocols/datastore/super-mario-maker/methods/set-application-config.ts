import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Int32 from '@/nex/types/int32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SetApplicationConfig';

	private applicationId = new UInt32();
	private key = new UInt32();
	private value = new Int32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.applicationId.extractFrom(stream);
		this.key.extractFrom(stream);
		this.value.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			applicationId: this.applicationId,
			key: this.key,
			value: this.value
		};
	}
}

// * No response data
export class Response {
	public static Name = 'SetApplicationConfig';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
