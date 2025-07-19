import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import FriendRequest from '@/nex/protocols/friends-wiiu/types/friend-request';
import FriendInfo from '@/nex/protocols/friends-wiiu/types/friend-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AddFriend';

	private pid = new PID();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pid.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pid: this.pid
		};
	}
}

export class Response {
	public static Name = 'AddFriend';

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
