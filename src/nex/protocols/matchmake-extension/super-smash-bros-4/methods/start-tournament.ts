import NEXByteStream from '@/nex/byte-stream';
import StartTournamentParam from '@/nex/protocols/matchmake-extension/super-smash-bros-4/types/start-tournament-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'StartTournament';

	private param = new StartTournamentParam();

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

// * No response data
export class Response {
	public static Name = 'StartTournament';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
