import NEXByteStream from '@/nex/byte-stream';
import RVBuffer from '@/nex/types/buffer';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetChallengeBlob';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetChallengeBlob';

	private pChallengeBlob = new RVBuffer();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pChallengeBlob.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pChallengeBlob: this.pChallengeBlob
		};
	}
}
