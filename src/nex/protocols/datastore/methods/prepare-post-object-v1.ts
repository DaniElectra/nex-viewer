import NEXByteStream from '@/nex/byte-stream';
import DataStorePreparePostParamV1 from '@/nex/protocols/datastore/types/datastore-prepare-post-param-v1';
import DataStoreReqPostInfoV1 from '@/nex/protocols/datastore/types/datastore-req-post-info-v1';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PreparePostObjectV1';

	private param = new DataStorePreparePostParamV1();

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
	public static Name = 'PreparePostObjectV1';

	private pReqPostInfo = new DataStoreReqPostInfoV1();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pReqPostInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pReqPostInfo: this.pReqPostInfo
		};
	}
}
