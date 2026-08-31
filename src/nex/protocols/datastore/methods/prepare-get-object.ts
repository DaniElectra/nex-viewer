import NEXByteStream from '@/nex/byte-stream';
import DataStorePrepareGetParam from '@/nex/protocols/datastore/types/datastore-prepare-get-param';
import DataStoreReqGetInfo from '@/nex/protocols/datastore/types/datastore-req-get-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PrepareGetObject';

	private param = new DataStorePrepareGetParam();

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
	public static Name = 'PrepareGetObject';

	private pReqGetInfo = new DataStoreReqGetInfo();

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
