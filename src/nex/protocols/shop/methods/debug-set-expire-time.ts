import NEXByteStream from '@/nex/byte-stream';
import DateTime from '@/nex/types/datetime';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DebugSetExpireTime';

	private expireTime = new DateTime();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.expireTime.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			expireTime: this.expireTime
		};
	}
}

// * No response data
export class Response {
	public static Name = 'DebugSetExpireTime';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
