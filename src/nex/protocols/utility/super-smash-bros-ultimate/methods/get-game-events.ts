import NEXByteStream from '@/nex/byte-stream';
import GetGameEventsParam from '@/nex/protocols/utility/super-smash-bros-ultimate/types/get-game-events-param';
import List from '@/nex/types/list';
import GameEvent from '@/nex/protocols/utility/super-smash-bros-ultimate/types/game-event';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetGameEvents';

	private param = new GetGameEventsParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param
		};
	}
}

export class Response {
	public static Name = 'GetGameEvents';

	private gameEvents = new List(new GameEvent());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.gameEvents.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gameEvents: this.gameEvents
		};
	}
}
