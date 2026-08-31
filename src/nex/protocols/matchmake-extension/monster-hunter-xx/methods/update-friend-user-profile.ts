import NEXByteStream from '@/nex/byte-stream';
import FriendUserParam from '@/nex/protocols/matchmake-extension/monster-hunter-xx/types/friend-user-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateFriendUserProfile';

	private param = new FriendUserParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateFriendUserProfile';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
