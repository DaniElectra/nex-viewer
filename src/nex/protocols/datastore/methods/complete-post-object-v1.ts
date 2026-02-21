import NEXByteStream from '@/nex/byte-stream';
import DataStoreCompletePostParamV1 from '@/nex/protocols/datastore/types/datastore-complete-post-param-v1';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CompletePostObjectV1';

	private param = new DataStoreCompletePostParamV1();

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
	public static Name = 'CompletePostObjectV1';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
