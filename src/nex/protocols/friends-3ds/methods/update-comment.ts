import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateComment';

	private comment = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.comment.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			comment: this.comment
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateComment';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}