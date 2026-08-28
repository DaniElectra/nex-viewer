import NEXByteStream from '@/nex/byte-stream';
import MiiTubeSearchParam from '@/nex/protocols/datastore/miitopia-3ds/types/mii-tube-search-param';
import MiiTubeSearchResult from '@/nex/protocols/datastore/miitopia-3ds/types/mii-tube-search-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchMii';

	private param = new MiiTubeSearchParam();

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
	public static Name = 'SearchMii';

	private pSearchResult = new MiiTubeSearchResult();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pSearchResult.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pSearchResult: this.pSearchResult
		};
	}
}
