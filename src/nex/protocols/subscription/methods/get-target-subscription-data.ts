import List from '@/nex/types/list';
import NEXByteStream from '@/nex/byte-stream';
import SubscriptionData from '@/nex/protocols/subscription/types/subscription-data';
import type RMCMessage from '@/nex/rmc-message';

// * No request data
export class Request {
	public static Name = 'GetTargetSubscriptionData';

	constructor() { }

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetTargetSubscriptionData';

	private targetsData = new List(new SubscriptionData());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.targetsData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			targetsData: this.targetsData
		};
	}
}
