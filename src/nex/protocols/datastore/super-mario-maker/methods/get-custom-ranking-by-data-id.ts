import NEXByteStream from '@/nex/byte-stream';
import DataStoreGetCustomRankingByDataIdParam from '@/nex/protocols/datastore/super-mario-maker/types/datastore-get-custom-ranking-by-data-id-param';
import List from '@/nex/types/list';
import DataStoreCustomRankingResult from '@/nex/protocols/datastore/super-mario-maker/types/datastore-custom-ranking-result';
import QResult from '@/nex/types/qresult';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetCustomRankingByDataId';

	private param = new DataStoreGetCustomRankingByDataIdParam();

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
	public static Name = 'GetCustomRankingByDataId';

	private pRankingResult = new List(new DataStoreCustomRankingResult());
	private pResults = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pRankingResult.extractFrom(stream);
		this.pResults.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pRankingResult: this.pRankingResult,
			pResults: this.pResults
		};
	}
}
