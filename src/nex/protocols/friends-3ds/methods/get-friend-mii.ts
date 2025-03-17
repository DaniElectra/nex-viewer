import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import FriendInfo from '@/nex/protocols/friends-3ds/types/friend-info';
import FriendMii from '@/nex/protocols/friends-3ds/types/friend-mii';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetFriendMii';

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
	public static Name = 'GetFriendMii';

	private miis = new List(new FriendMii());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.miis.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			miis: this.miis
		};
	}
}