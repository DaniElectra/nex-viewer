import List from '@/nex/types/list';
import NEXByteStream from '@/nex/byte-stream';
import SubscriptionData from '@/nex/protocols/subscription/types/subscription-data';
import type RMCMessage from '@/nex/rmc-message';

// * No request data
export class Request {
	public static Name = 'GetFriendSubscriptionData';

	constructor() { }

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetFriendSubscriptionData';

	private friendsData = new List(new SubscriptionData());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.friendsData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			friendsData: this.friendsData
		};
	}
}
