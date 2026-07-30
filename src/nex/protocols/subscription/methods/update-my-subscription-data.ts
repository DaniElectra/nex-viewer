import SubscriptionData from '@/nex/protocols/subscription/types/subscription-data';
import NEXByteStream from '@/nex/byte-stream';
import type RMCMessage from '@/nex/rmc-message';

export class Request {
	public static Name = 'UpdateMySubscriptionData';

	private param = new SubscriptionData();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateMySubscriptionData';

	constructor() { }

	public toJSON(): any {
		return {};
	}
}
