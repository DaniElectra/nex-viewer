import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import FriendRequest from '@/nex/protocols/friends-wiiu/types/friend-request';
import FriendInfo from '@/nex/protocols/friends-wiiu/types/friend-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AddFriendByName';

	private name = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.name.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			name: this.name
		};
	}
}

export class Response {
	public static name = 'AddFriendByName';

	private friendRequest = new FriendRequest();
	private friendInfo = new FriendInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.friendRequest.extractFrom(stream);
		this.friendInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			friendRequest: this.friendRequest,
			friendInfo: this.friendInfo
		};
	}
}