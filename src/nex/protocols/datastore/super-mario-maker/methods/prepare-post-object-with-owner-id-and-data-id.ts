import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import UInt64 from '@/nex/types/uint64';
import DataStorePreparePostParam from '@/nex/protocols/datastore/types/datastore-prepare-post-param';
import DataStoreReqPostInfo from '@/nex/protocols/datastore/types/datastore-req-post-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PreparePostObjectWithOwnerIdAndDataId';

	private ownerId = new UInt32();
	private dataId = new UInt64();
	private param = new DataStorePreparePostParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.ownerId.extractFrom(stream);
		this.dataId.extractFrom(stream);
		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			ownerId: this.ownerId,
			dataId: this.dataId,
			param: this.param
		};
	}
}

export class Response {
	public static Name = 'PreparePostObjectWithOwnerIdAndDataId';

	private pReqPostInfo = new DataStoreReqPostInfo();

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
