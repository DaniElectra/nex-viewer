import NEXByteStream from '@/nex/byte-stream';
import ServiceItemStartChallengeParam from '@/nex/protocols/service-item/wii-sports-club/types/service-item-start-challenge-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'StartChallenge';

	private startChallengeParam = new ServiceItemStartChallengeParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.startChallengeParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			startChallengeParam: this.startChallengeParam
		};
	}
}

// * No response data
export class Response {
	public static Name = 'StartChallenge';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
