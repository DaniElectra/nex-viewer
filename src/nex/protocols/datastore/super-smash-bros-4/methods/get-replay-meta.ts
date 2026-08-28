import NEXByteStream from '@/nex/byte-stream';
import DataStoreGetReplayMetaParam from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-get-replay-meta-param';
import DataStoreReplayMetaInfo from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-replay-meta-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetReplayMeta';

	private param = new DataStoreGetReplayMetaParam();

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
	public static Name = 'GetReplayMeta';

	private pMetaInfo = new DataStoreReplayMetaInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pMetaInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pMetaInfo: this.pMetaInfo
		};
	}
}
