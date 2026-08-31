import NEXByteStream from '@/nex/byte-stream';
import BankTransactionParam from '@/nex/protocols/datastore/pokemon-bank/types/bank-transaction-param';
import DataStoreReqUpdateInfo from '@/nex/protocols/datastore/types/datastore-req-update-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PrepareUpdateBankObject';

	private transactionParam = new BankTransactionParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.transactionParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			transactionParam: this.transactionParam
		};
	}
}

export class Response {
	public static Name = 'PrepareUpdateBankObject';

	private pTransactionParam = new BankTransactionParam();
	private pReqUpdateInfo = new DataStoreReqUpdateInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pTransactionParam.extractFrom(stream);
		this.pReqUpdateInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pTransactionParam: this.pTransactionParam,
			pReqUpdateInfo: this.pReqUpdateInfo
		};
	}
}
