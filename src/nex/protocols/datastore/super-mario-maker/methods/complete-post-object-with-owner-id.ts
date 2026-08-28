import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import DataStoreCompletePostParam from '@/nex/protocols/datastore/types/datastore-complete-post-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CompletePostObjectWithOwnerId';

	private ownerId = new UInt32();
	private param = new DataStoreCompletePostParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.ownerId.extractFrom(stream);
		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			ownerId: this.ownerId,
			param: this.param
		};
	}
}

// * No response data
export class Response {
	public static Name = 'CompletePostObjectWithOwnerId';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
