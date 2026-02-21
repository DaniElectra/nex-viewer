import NEXByteStream from '@/nex/byte-stream';
import DataStorePrepareGetParam from '@/nex/protocols/datastore/types/datastore-prepare-get-param';
import DataStoreReqGetInfo from '@/nex/protocols/datastore/types/datastore-req-get-info';
import DataStoreReqGetAdditionalMeta from '@/nex/protocols/datastore/types/datastore-req-get-additional-meta';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PrepareGetObjectOrMetaBinary';

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
	public static Name = 'PrepareGetObjectOrMetaBinary';

	private pReqGetInfo = new DataStoreReqGetInfo();
	private pReqGetAdditionalMeta = new DataStoreReqGetAdditionalMeta();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pReqGetInfo.extractFrom(stream);
		this.pReqGetAdditionalMeta.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pReqGetInfo: this.pReqGetInfo,
			pReqGetAdditionalMeta: this.pReqGetInfo
		};
	}
}
