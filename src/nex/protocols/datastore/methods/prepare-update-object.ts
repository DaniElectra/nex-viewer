import NEXByteStream from '@/nex/byte-stream';
import DataStorePrepareUpdateParam from '@/nex/protocols/datastore/types/datastore-prepare-update-param';
import DataStoreReqUpdateInfo from '@/nex/protocols/datastore/types/datastore-req-update-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PrepareUpdateObject';

	private param = new DataStorePrepareUpdateParam();

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
	public static Name = 'PrepareUpdateObject';

	private pReqUpdateInfo = new DataStoreReqUpdateInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pReqUpdateInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pReqUpdateInfo: this.pReqUpdateInfo
		};
	}
}
