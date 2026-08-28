import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import RVString from '@/nex/types/string';
import DataStoreSearchParam from '@/nex/protocols/datastore/types/datastore-search-param';
import DataStoreCustomRankingResult from '@/nex/protocols/datastore/super-mario-maker/types/datastore-custom-ranking-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ConditionalSearchObject';

	private condition = new UInt32();
	private param = new DataStoreSearchParam();
	private extraData = new List(new RVString());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.condition.extractFrom(stream);
		this.param.extractFrom(stream);
		this.extraData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			condition: this.condition,
			param: this.param,
			extraData: this.extraData
		};
	}
}

export class Response {
	public static Name = 'ConditionalSearchObject';

	private pRankingResults = new List(new DataStoreCustomRankingResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pRankingResults.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pRankingResults: this.pRankingResults
		};
	}
}
