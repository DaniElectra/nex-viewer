import NEXByteStream from '@/nex/byte-stream';
import ServiceItemEndChallengeParam from '@/nex/protocols/service-item/wii-sports-club/types/service-item-end-challenge-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'EndChallenge';

	private endChallengeParam = new ServiceItemEndChallengeParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.endChallengeParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			endChallengeParam: this.endChallengeParam
		};
	}
}

// * No response data
export class Response {
	public static Name = 'EndChallenge';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
