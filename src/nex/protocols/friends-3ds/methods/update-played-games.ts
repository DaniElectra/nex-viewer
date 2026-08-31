import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PlayedGame from '@/nex/protocols/friends-3ds/types/played-game';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdatePlayedGames';

	private playedGames = new List(new PlayedGame());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.playedGames.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			playedGames: this.playedGames
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdatePlayedGames';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
