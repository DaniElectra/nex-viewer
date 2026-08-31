import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import ResultRange from '@/nex/types/result-range';
import PersistentGatheringSearchCriteria from '@/nex/protocols/matchmake-extension/xenoblade-chronicles-x/types/persistent-gathering-search-criteria';
import PersistentGathering from '@/nex/protocols/match-making/types/persistent-gathering';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchPersistentGathering';

	private searchParam = new PersistentGatheringSearchCriteria();
	private resultRange = new ResultRange();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.searchParam.extractFrom(stream);
		this.resultRange.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			searchParam: this.searchParam,
			resultRange: this.resultRange
		};
	}
}

export class Response {
	public static Name = 'SearchPersistentGathering';

	private gatherings = new List(new PersistentGathering());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.gatherings.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gatherings: this.gatherings
		};
	}
}
