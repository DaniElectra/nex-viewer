import NEXByteStream from '@/nex/byte-stream';
import RegisterTournamentPlayerInfoParam from '@/nex/protocols/matchmake-extension/super-smash-bros-4/types/register-tournament-player-info-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RegisterTournamentPlayerInfo';

	private param = new RegisterTournamentPlayerInfoParam();

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
	public static Name = 'RegisterTournamentPlayerInfo';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
