import NEXByteStream from '@/nex/byte-stream';
import DateTime from '@/nex/types/datetime';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetGameServerTime';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetGameServerTime';

	private pServerTime = new DateTime();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pServerTime.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pServerTime: this.pServerTime
		};
	}
}
