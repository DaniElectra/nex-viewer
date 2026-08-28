import NEXByteStream from '@/nex/byte-stream';
import DataStoreFetchMyInfosParam from '@/nex/protocols/datastore/super-mario-odyssey/types/datastore-fetch-my-infos-param';
import DataStoreFetchMyInfosResult from '@/nex/protocols/datastore/super-mario-odyssey/types/datastore-fetch-my-infos-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'FetchMyInfos';

	private param = new DataStoreFetchMyInfosParam();

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
	public static Name = 'FetchMyInfos';

	private pResult = new DataStoreFetchMyInfosResult();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pResult.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pResult: this.pResult
		};
	}
}
