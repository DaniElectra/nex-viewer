import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import FriendUserInfo from '@/nex/protocols/matchmake-extension/monster-hunter-xx/types/friend-user-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetFriendUserProfiles';

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
	public static Name = 'GetFriendUserProfiles';

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
