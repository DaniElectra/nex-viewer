import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import FriendUserInfo from '@/nex/protocols/matchmake-extension/monster-hunter-xx/types/friend-user-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetFriends';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetFriends';

	private infos = new List(new FriendUserInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.infos.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			infos: this.infos
		};
	}
}
