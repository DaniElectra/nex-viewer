import NEXByteStream from '@/nex/byte-stream';
import DataStorePreparePostReplayParam from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-prepare-post-replay-param';
import DataStorePreparePostParam from '@/nex/protocols/datastore/types/datastore-prepare-post-param';
import DataStoreReqPostInfo from '@/nex/protocols/datastore/types/datastore-req-post-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PreparePostReplay';

	private param = new DataStorePreparePostReplayParam();

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
	public static Name = 'PreparePostReplay';

	private pPostParam = new DataStorePreparePostParam();
	private pReqPostInfo = new DataStoreReqPostInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pPostParam.extractFrom(stream);
		this.pReqPostInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pPostParam: this.pPostParam,
			pReqPostInfo: this.pReqPostInfo
		};
	}
}
