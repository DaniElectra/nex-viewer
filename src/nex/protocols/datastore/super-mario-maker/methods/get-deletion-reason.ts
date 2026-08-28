import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetDeletionReason';

	private dataIdLst = new List(new UInt64());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.dataIdLst.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dataIdLst: this.dataIdLst
		};
	}
}

export class Response {
	public static Name = 'GetDeletionReason';

	private pDeletionReasons = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pDeletionReasons.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pDeletionReasons: this.pDeletionReasons
		};
	}
}
