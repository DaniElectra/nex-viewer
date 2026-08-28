import NEXByteStream from '@/nex/byte-stream';
import PlayLogPreparePostParam from '@/nex/protocols/datastore/splatoon-2/types/play-log-prepare-post-param';
import DataStoreReqPostInfo from '@/nex/protocols/datastore/types/datastore-req-post-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PreparePostPlayLog';

	private param = new PlayLogPreparePostParam();

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
	public static Name = 'PreparePostPlayLog';

	private postRequestInfo = new DataStoreReqPostInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.postRequestInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			postRequestInfo: this.postRequestInfo
		};
	}
}
