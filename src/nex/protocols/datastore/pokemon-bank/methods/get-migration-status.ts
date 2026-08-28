import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import BankMigrationInfo from '@/nex/protocols/datastore/pokemon-bank/types/bank-migration-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetMigrationStatus';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetMigrationStatus';

	private pInfo = new BankMigrationInfo();
	private detailCode = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pInfo.extractFrom(stream);
		this.detailCode.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pInfo: this.pInfo,
			detailCode: this.detailCode
		};
	}
}
