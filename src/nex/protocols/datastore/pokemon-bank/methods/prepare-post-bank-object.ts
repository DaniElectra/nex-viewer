import NEXByteStream from '@/nex/byte-stream';
import UInt16 from '@/nex/types/uint16';
import UInt32 from '@/nex/types/uint32';
import DataStoreReqPostInfo from '@/nex/protocols/datastore/types/datastore-req-post-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PreparePostBankObject';

	private slotId = new UInt16();
	private size = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.slotId.extractFrom(stream);
		this.size.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			slotId: this.slotId,
			size: this.size
		};
	}
}

export class Response {
	public static Name = 'PreparePostBankObject';

	private pReqPostInfo = new DataStoreReqPostInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pReqPostInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pReqPostInfo: this.pReqPostInfo
		};
	}
}
