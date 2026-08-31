import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AcquireTagId';

	private nexUniqueIds = new List(new UInt64());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.nexUniqueIds.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			nexUniqueIds: this.nexUniqueIds
		};
	}
}

export class Response {
	public static Name = 'AcquireTagId';

	private pTagId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pTagId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pTagId: this.pTagId
		};
	}
}
