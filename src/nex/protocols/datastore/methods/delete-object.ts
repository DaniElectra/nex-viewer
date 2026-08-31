import NEXByteStream from '@/nex/byte-stream';
import DataStoreDeleteParam from '@/nex/protocols/datastore/types/datastore-delete-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeleteObject';

	private param = new DataStoreDeleteParam();

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

// * No response data
export class Response {
	public static Name = 'DeleteObject';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
