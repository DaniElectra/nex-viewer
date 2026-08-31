import NEXByteStream from '@/nex/byte-stream';
import DataStoreTouchObjectParam from '@/nex/protocols/datastore/types/datastore-touch-object-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'TouchObject';

	private param = new DataStoreTouchObjectParam();

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
	public static Name = 'TouchObject';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
