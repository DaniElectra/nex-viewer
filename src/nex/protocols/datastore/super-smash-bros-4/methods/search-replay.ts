import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import DataStoreSearchReplayParam from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-search-replay-param';
import DataStorePrepareGetReplayParam from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-prepare-get-replay-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchReplay';

	private param = new DataStoreSearchReplayParam();

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
	public static Name = 'SearchReplay';

	private pGetReplayParam = new List(new DataStorePrepareGetReplayParam());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pGetReplayParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pGetReplayParam: this.pGetReplayParam
		};
	}
}
