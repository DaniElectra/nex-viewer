import NEXByteStream from '@/nex/byte-stream';
import MyProfile from '@/nex/protocols/friends-3ds/types/my-profile';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateProfile';

	private profile = new MyProfile();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.profile.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			profile: this.profile
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateProfile';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}