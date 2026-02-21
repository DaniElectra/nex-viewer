import NEXByteStream from '@/nex/byte-stream';
import DataStoreChangeMetaParamV1 from '@/nex/protocols/datastore/types/datastore-change-meta-param-v1';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ChangeMetaV1';

	private param = new DataStoreChangeMetaParamV1();

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
	public static Name = 'ChangeMetaV1';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
