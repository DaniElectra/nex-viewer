import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import DataStoreSearchSharedDataParam from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-search-shared-data-param';
import DataStoreSharedDataInfo from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-shared-data-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchSharedData';

	private param = new DataStoreSearchSharedDataParam();

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
	public static Name = 'SearchSharedData';

	private pSharedDataInfoList = new List(new DataStoreSharedDataInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pSharedDataInfoList.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pSharedDataInfoList: this.pSharedDataInfoList
		};
	}
}
