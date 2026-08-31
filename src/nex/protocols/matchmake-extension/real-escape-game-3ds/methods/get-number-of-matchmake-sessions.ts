import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetNumberOfMatchmakeSessions';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetNumberOfMatchmakeSessions';

	private sessionCount = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.sessionCount.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			sessionCount: this.sessionCount
		};
	}
}
