import NEXByteStream from '@/nex/byte-stream';
import UpdateCurrentUserParam from '@/nex/protocols/utility/splatoon-2/types/update-current-user-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateCurrentUser';

	private param = new UpdateCurrentUserParam();

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
	public static Name = 'UpdateCurrentUser';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
