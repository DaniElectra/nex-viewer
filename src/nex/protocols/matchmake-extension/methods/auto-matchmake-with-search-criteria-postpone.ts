import NEXByteStream from '@/nex/byte-stream';
import type RMCMessage from '@/nex/rmc-message';
import AnyDataHolder from '@/nex/types/any-data-holder';
import List from '@/nex/types/list';
import MatchmakeSessionSearchCriteria from '@/nex/protocols/match-making/types/matchmake-session-search-criteria';
import RVString from '@/nex/types/string';
import type * as RMCs from '@/types/nex/rmcs/matchmake-extension/auto-matchmake-with-search-criteria-postpone';

export class Request {
	public static Name = 'AutoMatchmakeWithSearchCriteria_Postpone';

	private criteria = new List(new MatchmakeSessionSearchCriteria());
	private gathering = new AnyDataHolder();
	private message = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.criteria.extractFrom(stream);
		this.gathering.extractFrom(stream);
		this.message.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			criteria: this.criteria,
			gathering: this.gathering,
			message: this.message,
		};
	}
}

export class Response {
	public static Name = 'AutoMatchmakeWithSearchCriteria_Postpone';

	private joinedMatchmakeSession = new AnyDataHolder();

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
