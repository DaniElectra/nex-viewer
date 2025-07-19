import NEXByteStream from '@/nex/byte-stream';
import AccountData from '@/nex/protocols/account-management/types/account-data';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'RetrieveAccount';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'RetrieveAccount';

	private oAccountData = new AccountData();
	private oPublicData = new AnyDataHolder();
	private oPrivateData = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.oAccountData.extractFrom(stream);
		this.oPublicData.extractFrom(stream);
		this.oPrivateData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			oAccountData: this.oAccountData,
			oPublicData: this.oPublicData,
			oPrivateData: this.oPrivateData
		};
	}
}
