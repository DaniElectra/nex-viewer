import NEXByteStream from '@/nex/byte-stream';
import DataStorePrepareGetReplayParam from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-prepare-get-replay-param';
import DataStoreReqGetInfo from '@/nex/protocols/datastore/types/datastore-req-get-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PrepareGetReplay';

	private param = new DataStorePrepareGetReplayParam();

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
	public static Name = 'PrepareGetReplay';

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
