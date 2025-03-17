import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'MarkFriendRequestsAsReceived';

	private friendRequests = new List(new UInt64());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.friendRequests.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			friendRequests: this.friendRequests
		};
	}
}

// * No response data
export class Response {
	public static Name = 'MarkFriendRequestsAsReceived';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}