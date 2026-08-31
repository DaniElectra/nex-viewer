import NEXByteStream from '@/nex/byte-stream';
import PlayLogPrepareGetParam from '@/nex/protocols/datastore/splatoon-2/types/play-log-prepare-get-param';
import DataStoreReqGetInfo from '@/nex/protocols/datastore/types/datastore-req-get-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PrepareGetPlayLog';

	private param = new PlayLogPrepareGetParam();

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
	public static Name = 'PrepareGetPlayLog';

	private getRequestInfo = new DataStoreReqGetInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.getRequestInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			getRequestInfo: this.getRequestInfo
		};
	}
}
