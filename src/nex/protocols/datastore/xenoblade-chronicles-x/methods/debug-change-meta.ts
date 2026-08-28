import NEXByteStream from '@/nex/byte-stream';
import DebugDataStoreChangeMetaParam from '@/nex/protocols/datastore/xenoblade-chronicles-x/types/debug-datastore-change-meta-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DebugChangeMeta';

	private param = new DebugDataStoreChangeMetaParam();

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
	public static Name = 'DebugChangeMeta';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
