import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import SubscriptionData from '@/nex/protocols/subscription/types/subscription-data';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UnknownMethod0xE';

	private unknown = new UInt32();
	private param = new SubscriptionData();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown.extractFrom(stream);
		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown: this.unknown,
			param: this.param
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UnknownMethod0xE';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
