import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import GameKey from '@/nex/protocols/friends-3ds/types/game-key';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'IsActiveGame';

	private pids = new List(new PID());
	private gameKey = new GameKey();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pids.extractFrom(stream);
		this.gameKey.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pids: this.pids,
			gameKey: this.gameKey
		};
	}
}

export class Response {
	public static Name = 'IsActiveGame';

	private pids = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pids.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pids: this.pids
		};
	}
}
