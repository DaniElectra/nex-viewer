import NEXByteStream from '@/nex/byte-stream';
import UInt16 from '@/nex/types/uint16';
import UInt32 from '@/nex/types/uint32';
import BankTransactionParam from '@/nex/protocols/datastore/pokemon-bank/types/bank-transaction-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetTransactionParam';

	private slotId = new UInt16();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.slotId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			slotId: this.slotId
		};
	}
}

export class Response {
	public static Name = 'GetTransactionParam';

	private pTransactionParam = new BankTransactionParam();
	private pStatus = new UInt32();
	private pApplicationId = new UInt16();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pTransactionParam.extractFrom(stream);
		this.pStatus.extractFrom(stream);
		this.pApplicationId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pTransactionParam: this.pTransactionParam,
			pStatus: this.pStatus,
			pApplicationId: this.pApplicationId
		};
	}
}
