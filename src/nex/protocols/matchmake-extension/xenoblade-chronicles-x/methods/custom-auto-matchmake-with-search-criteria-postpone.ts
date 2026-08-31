import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import AnyDataHolder from '@/nex/types/any-data-holder';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import MatchmakeSessionSearchCriteria from '@/nex/protocols/match-making/types/matchmake-session-search-criteria';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CustomAutoMatchmakeWithSearchCriteria_Postpone';

	private lstSearchCriteria = new List(new MatchmakeSessionSearchCriteria());
	private anyGathering = new AnyDataHolder();
	private strMessage = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.lstSearchCriteria.extractFrom(stream);
		this.anyGathering.extractFrom(stream);
		this.strMessage.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstSearchCriteria: this.lstSearchCriteria,
			anyGathering: this.anyGathering,
			strMessage: this.strMessage
		};
	}
}

export class Response {
	public static Name = 'CustomAutoMatchmakeWithSearchCriteria_Postpone';

	private joinedGathering = new AnyDataHolder();
	private unknown = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.joinedGathering.extractFrom(stream);
		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			joinedGathering: this.joinedGathering,
			unknown: this.unknown
		};
	}
}
