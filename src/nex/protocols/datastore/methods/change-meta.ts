import NEXByteStream from '@/nex/byte-stream';
import DataStoreChangeMetaParam from '@/nex/protocols/datastore/types/datastore-change-meta-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ChangeMeta';

	private param = new DataStoreChangeMetaParam();

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
	public static Name = 'ChangeMeta';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
