import NEXByteStream from '@/nex/byte-stream';
import PrincipalPreference from '@/nex/protocols/friends-wiiu/types/principal-preference';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdatePreference';

	private principalPreference = new PrincipalPreference();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.principalPreference.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			principalPreference: this.principalPreference
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdatePreference';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
