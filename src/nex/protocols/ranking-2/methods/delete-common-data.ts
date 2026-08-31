import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeleteCommonData';

	private nexUniqueId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.nexUniqueId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			nexUniqueId: this.nexUniqueId
		};
	}
}

// * No response data
export class Response {
	public static Name = 'DeleteCommonData';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
