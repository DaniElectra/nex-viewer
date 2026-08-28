import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import OLSFriend from '@/nex/protocols/ols-storage/types/ols-friend';
import OLSProfile from '@/nex/protocols/ols-storage/types/ols-profile';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'QueryFriendProfiles';

	private friends = new List(new OLSFriend());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.friends.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			friends: this.friends
		};
	}
}

export class Response {
	public static Name = 'QueryFriendProfiles';

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
