import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import FriendPicture from '@/nex/protocols/friends-3ds/types/friend-picture';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetFriendPicture';

	private unknown = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown: this.unknown
		};
	}
}

export class Response {
	public static Name = 'GetFriendPicture';

	private friendPictures = new List(new FriendPicture());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.friendPictures.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			friendPictures: this.friendPictures
		};
	}
}