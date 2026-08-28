import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import OLSProfile from '@/nex/protocols/ols-storage/types/ols-profile';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'QueryUbisoftProfiles';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'QueryUbisoftProfiles';

	private profiles = new List(new OLSProfile());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.profiles.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			profiles: this.profiles
		};
	}
}
