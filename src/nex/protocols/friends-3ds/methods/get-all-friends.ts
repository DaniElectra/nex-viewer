import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import FriendRelationship from '@/nex/protocols/friends-3ds/types/friend-relationship';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetAllFriends';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetAllFriends';

	private friendRelationships = new List(new FriendRelationship());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.friendRelationships.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			friendRelationships: this.friendRelationships
		};
	}
}
