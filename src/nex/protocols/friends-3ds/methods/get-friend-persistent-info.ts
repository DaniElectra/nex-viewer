import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import FriendPersistentInfo from '@/nex/protocols/friends-3ds/types/friend-persistent-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetFriendPersistentInfo';

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
	public static Name = 'GetFriendPersistentInfo';

	private persistentInfos = new List(new FriendPersistentInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.persistentInfos.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			persistentInfos: this.persistentInfos
		};
	}
}
