import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import Bool from '@/nex/types/bool';
import SimplePlayingSession from '@/nex/protocols/match-making/types/simple-playing-session';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/matchmake-extension/get-simple-playing-session';

export class Request {
	public static Name = 'GetSimplePlayingSession';

	private lstPrincipalId = new List(new PID());
	private includeLoginUser = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstPrincipalId.extractFrom(stream);
		this.includeLoginUser.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			lstPrincipalId: this.lstPrincipalId,
			includeLoginUser: this.includeLoginUser
		};
	}
}

export class Response {
	public static Name = 'GetSimplePlayingSession';

	private lstSimplePlayingSession = new List(new SimplePlayingSession());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstSimplePlayingSession.extractFrom(stream);
	}

	public toJSON(): RMCs.Response {
		return {
			lstSimplePlayingSession: this.lstSimplePlayingSession
		};
	}
}