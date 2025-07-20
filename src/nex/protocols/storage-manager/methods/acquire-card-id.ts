import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'AcquireCardId';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'AcquireCardId';

	private cardID = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.cardID.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			cardID: this.cardID
		};
	}
}
