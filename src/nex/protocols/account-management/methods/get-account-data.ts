import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import AccountData from '@/nex/protocols/account-management/types/account-data';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetAccountData';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetAccountData';

	private retval = new UInt32();
	private oAccountData = new AccountData();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.retval.extractFrom(stream);
		this.oAccountData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			retval: this.retval,
			oAccountData: this.oAccountData
		};
	}
}
