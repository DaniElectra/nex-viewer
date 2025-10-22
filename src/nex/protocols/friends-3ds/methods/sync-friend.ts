import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import FriendRelationship from '@/nex/protocols/friends-3ds/types/friend-relationship';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SyncFriend';

	private localFriendCode = new UInt64();
	private pids = new List(new PID());
	private localFriendCodes = new List(new UInt64());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.localFriendCode.extractFrom(stream);
		this.pids.extractFrom(stream);
		this.localFriendCodes.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			localFriendCode: this.localFriendCode,
			pids: this.pids,
			localFriendCodes: this.localFriendCodes
		};
	}
}

export class Response {
	public static Name = 'SyncFriend';

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
