import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetPrivateData';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetPrivateData';

	private retval = new Bool();
	private oData = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.retval.extractFrom(stream);
		this.oData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			retval: this.retval,
			oData: this.oData
		};
	}
}