import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import DateTime from '@/nex/types/datetime';
import RVString from '@/nex/types/string';
import QResult from '@/nex/types/qresult';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DisableAccount';

	private idPrincipal = new PID();
	private dtUntil = new DateTime();
	private strMessage = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.idPrincipal.extractFrom(stream);
		this.dtUntil.extractFrom(stream);
		this.strMessage.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			idPrincipal: this.idPrincipal,
			dtUntil: this.dtUntil,
			strMessage: this.strMessage
		};
	}
}

export class Response {
	public static Name = 'DisableAccount';

	private retval = new QResult();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.retval.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			retval: this.retval
		};
	}
}