import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import FriendInfo from '@/nex/protocols/friends-wiiu/types/friend-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AcceptFriendRequest';

	private id = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.id.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			id: this.id
		};
	}
}

export class Response {
	public static Name = 'AcceptFriendRequest';

	private friendInfo = new FriendInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.friendInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			friendInfo: this.friendInfo
		};
	}
}
