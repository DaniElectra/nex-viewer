import NEXByteStream from '@/nex/byte-stream';
import UInt16 from '@/nex/types/uint16';
import BankTransactionParam from '@/nex/protocols/datastore/pokemon-bank/types/bank-transaction-param';
import DataStoreReqGetInfo from '@/nex/protocols/datastore/types/datastore-req-get-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PrepareGetBankObject';

	private slotId = new UInt16();
	private applicationId = new UInt16();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.slotId.extractFrom(stream);
		this.applicationId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			slotId: this.slotId,
			applicationId: this.applicationId
		};
	}
}

export class Response {
	public static Name = 'PrepareGetBankObject';

	private pTransactionParam = new BankTransactionParam();
	private pReqGetInfo = new DataStoreReqGetInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pTransactionParam.extractFrom(stream);
		this.pReqGetInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pTransactionParam: this.pTransactionParam,
			pReqGetInfo: this.pReqGetInfo
		};
	}
}
