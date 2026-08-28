import NEXByteStream from '@/nex/byte-stream';
import DataStoreReplayMetaInfo from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-replay-meta-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetNextReplay';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetNextReplay';

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
