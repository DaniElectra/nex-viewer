import NEXByteStream from '@/nex/byte-stream';
import RatingSessionToken from '@/nex/protocols/rating/types/rating-session-token';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'UnknownMethod0x1';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'UnknownMethod0x1';

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
