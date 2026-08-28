import NEXByteStream from '@/nex/byte-stream';
import UInt16 from '@/nex/types/uint16';
import Bool from '@/nex/types/bool';
import BankTransactionParam from '@/nex/protocols/datastore/pokemon-bank/types/bank-transaction-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CompleteUpdateBankObject';

	private slotId = new UInt16();
	private transactionParam = new BankTransactionParam();
	private isForce = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.slotId.extractFrom(stream);
		this.transactionParam.extractFrom(stream);
		this.isForce.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			slotId: this.slotId,
			transactionParam: this.transactionParam,
			isForce: this.isForce
		};
	}
}

// * No response data
export class Response {
	public static Name = 'CompleteUpdateBankObject';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
