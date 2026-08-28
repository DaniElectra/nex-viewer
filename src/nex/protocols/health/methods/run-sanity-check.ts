import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'RunSanityCheck';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'RunSanityCheck';

	private retval = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.retval.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			retval: this.retval
		};
	}
}
