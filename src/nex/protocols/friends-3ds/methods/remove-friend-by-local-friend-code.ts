import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RemoveFriendByLocalFriendCode';

	private localFriendCode = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.localFriendCode.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			localFriendCode: this.localFriendCode
		};
	}
}

// * No response data
export class Response {
	public static Name = 'RemoveFriendByLocalFriendCode';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}