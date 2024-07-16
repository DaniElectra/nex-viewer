import NEXByteStream from '@/nex/byte-stream';
import AutoMatchmakeParam from '@/nex/protocols/match-making/types/auto-matchmake-param';
import MatchmakeSession from '@/nex/protocols/match-making/types/matchmake-session';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/matchmake-extension/auto-matchmake-with-param-postpone';

export class Request {
	public static Name = 'AutoMatchmakeWithParam_Postpone';

	private autoMatchmakeParam = new AutoMatchmakeParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.autoMatchmakeParam.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			autoMatchmakeParam: this.autoMatchmakeParam
		};
	}
}

export class Response {
	public static Name = 'AutoMatchmakeWithParam_Postpone';

	private joinedMatchmakeSession = new MatchmakeSession();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.joinedMatchmakeSession.extractFrom(stream);
	}

	public toJSON(): RMCs.Response {
		return {
			joinedMatchmakeSession: this.joinedMatchmakeSession
		};
	}
}