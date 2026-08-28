import NEXByteStream from '@/nex/byte-stream';
import RegisterUserParam from '@/nex/protocols/datastore/super-mario-maker-2/types/register-user-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RegisterUser';

	private param = new RegisterUserParam();

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
	public static Name = 'RegisterUser';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
