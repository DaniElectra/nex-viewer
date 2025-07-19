import NEXByteStream from '@/nex/byte-stream';
import Mii from '@/nex/protocols/friends-3ds/types/mii';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateMii';

	private mii = new Mii();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.mii.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			mii: this.mii
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateMii';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
