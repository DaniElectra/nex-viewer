import NEXByteStream from '@/nex/byte-stream';
import DataStorePrepareGetParamV1 from '@/nex/protocols/datastore/types/datastore-prepare-get-param-v1';
import DataStoreReqGetInfoV1 from '@/nex/protocols/datastore/types/datastore-req-get-info-v1';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PrepareGetObjectV1';

	private param = new DataStorePrepareGetParamV1();

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
	public static Name = 'PrepareGetObjectV1';

	private pReqGetInfo = new DataStoreReqGetInfoV1();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pReqGetInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pReqGetInfo: this.pReqGetInfo
		};
	}
}
