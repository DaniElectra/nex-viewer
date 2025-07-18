import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'AcquireNexUniqueId';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'AcquireNexUniqueId';

	private pNexUniqueId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pNexUniqueId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pNexUniqueId: this.pNexUniqueId
		};
	}
}
