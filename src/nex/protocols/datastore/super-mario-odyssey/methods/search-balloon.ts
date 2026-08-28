import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import DataStoreSearchBalloonParam from '@/nex/protocols/datastore/super-mario-odyssey/types/datastore-search-balloon-param';
import DataStoreSearchBalloonResultSet from '@/nex/protocols/datastore/super-mario-odyssey/types/datastore-search-balloon-result-set';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchBalloon';

	private param = new DataStoreSearchBalloonParam();

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
	public static Name = 'SearchBalloon';

	private pResults = new List(new DataStoreSearchBalloonResultSet());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pResults.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pResults: this.pResults
		};
	}
}
