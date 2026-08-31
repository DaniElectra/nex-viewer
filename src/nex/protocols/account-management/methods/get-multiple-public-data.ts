import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import Bool from '@/nex/types/bool';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetMultiplePublicData';

	private lstPrincipals = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.lstPrincipals.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstPrincipals: this.lstPrincipals
		};
	}
}

export class Response {
	public static Name = 'GetMultiplePublicData';

	private retval = new Bool();
	private oData = new List(new AnyDataHolder());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

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
