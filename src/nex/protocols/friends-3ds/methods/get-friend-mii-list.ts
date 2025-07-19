import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import FriendInfo from '@/nex/protocols/friends-3ds/types/friend-info';
import FriendMiiList from '@/nex/protocols/friends-3ds/types/friend-mii-list';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetFriendMiiList';

	private friendInfos = new List(new FriendInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.friendInfos.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			friendInfos: this.friendInfos
		};
	}
}

export class Response {
	public static Name = 'GetFriendMiiList';

	private miiLists = new List(new FriendMiiList());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.miiLists.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			miiLists: this.miiLists
		};
	}
}
