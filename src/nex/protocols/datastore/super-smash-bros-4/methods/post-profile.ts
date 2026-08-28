import NEXByteStream from '@/nex/byte-stream';
import DataStorePostProfileParam from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-post-profile-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PostProfile';

	private param = new DataStorePostProfileParam();

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
	public static Name = 'PostProfile';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
