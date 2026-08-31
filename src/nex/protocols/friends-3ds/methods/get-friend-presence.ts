import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import FriendPresence from '@/nex/protocols/friends-3ds/types/friend-presence';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetFriendPresence';

	private pids = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pids.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pids: this.pids
		};
	}
}

export class Response {
	public static Name = 'GetFriendPresence';

	private friendPresences = new List(new FriendPresence());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.friendPresences.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			friendPresences: this.friendPresences
		};
	}
}
