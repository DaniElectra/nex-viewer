import NEXByteStream from '@/nex/byte-stream';
import RatingSessionToken from '@/nex/protocols/rating/types/rating-session-token';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UnknownMethod0x2';

	private sessionToken = new RatingSessionToken();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.sessionToken.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			sessionToken: this.sessionToken
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UnknownMethod0x2';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
