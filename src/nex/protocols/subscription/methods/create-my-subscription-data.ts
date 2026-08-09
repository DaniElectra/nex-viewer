import UInt32 from '@/nex/types/uint32';
import SubscriptionData from '@/nex/protocols/subscription/types/subscription-data';
import Bool from '@/nex/types/bool';
import NEXByteStream from '@/nex/byte-stream';
import type RMCMessage from '@/nex/rmc-message';

export class Request {
	public static Name = 'CreateMySubscriptionData';

	private unknown1 = new UInt32();
	private param = new SubscriptionData();
	private unknown2 = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown1.extractFrom(stream);
		this.param.extractFrom(stream);
		this.unknown2.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown1: this.unknown1,
			param: this.param,
			unknown2: this.unknown2
		};
	}
}

// * No response data
export class Response {
	public static Name = 'CreateMySubscriptionData';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
