import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import CountResult from '@/nex/protocols/datastore/real-escape-game-3ds/types/count-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetCount';

	private applicationIdList = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.applicationIdList.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			applicationIdList: this.applicationIdList
		};
	}
}

export class Response {
	public static Name = 'GetCount';

	private pResult = new List(new CountResult());
	private config = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pResult.extractFrom(stream);
		this.config.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pResult: this.pResult,
			config: this.config
		};
	}
}
