import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import Bool from '@/nex/types/bool';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetPublicData';

	private idPrincipal = new PID();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.idPrincipal.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			idPrincipal: this.idPrincipal
		};
	}
}

export class Response {
	public static Name = 'GetPublicData';

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