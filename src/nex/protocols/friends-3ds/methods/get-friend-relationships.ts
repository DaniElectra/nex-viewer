import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import FriendRelationship from '@/nex/protocols/friends-3ds/types/friend-relationship';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetFriendRelationships';

	private pids = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!!);

		this.pids.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pids: this.pids
		};
	}
}

export class Response {
	public static Name = 'GetFriendRelationships';

	private friendRelationships = new List(new FriendRelationship());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!!);

		this.friendRelationships.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			friendRelationships: this.friendRelationships
		};
	}
}
