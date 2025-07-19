import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CancelFriendRequest';

	private id = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.id.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			id: this.id
		};
	}
}

// * No response data
export class Response {
	public static Name = 'CancelFriendRequest';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
