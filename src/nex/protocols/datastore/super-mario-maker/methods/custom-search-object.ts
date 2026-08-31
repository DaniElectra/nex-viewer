import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import DataStoreSearchParam from '@/nex/protocols/datastore/types/datastore-search-param';
import DataStoreSearchResult from '@/nex/protocols/datastore/types/datastore-search-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CustomSearchObject';

	private condition = new UInt32();
	private param = new DataStoreSearchParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.condition.extractFrom(stream);
		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			condition: this.condition,
			param: this.param
		};
	}
}

export class Response {
	public static Name = 'CustomSearchObject';

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
