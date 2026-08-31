import NEXByteStream from '@/nex/byte-stream';
import DataStoreSearchParam from '@/nex/protocols/datastore/types/datastore-search-param';
import DataStoreSearchResult from '@/nex/protocols/datastore/types/datastore-search-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchObjectLight';

	private param = new DataStoreSearchParam();

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
	public static Name = 'SearchObjectLight';

	private pSearchResult = new DataStoreSearchResult();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pSearchResult.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pSearchResult: this.pSearchResult
		};
	}
}
