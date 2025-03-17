import NEXByteStream from '@/nex/byte-stream';
import GameKey from '@/nex/protocols/friends-3ds/types/game-key';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateFavoriteGameKey';

	private gameKey = new GameKey();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gameKey.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gameKey: this.gameKey
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateFavoriteGameKey';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}