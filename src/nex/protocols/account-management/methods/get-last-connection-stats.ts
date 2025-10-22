import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import DateTime from '@/nex/types/datetime';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetLastConnectionStats';

	private idPrincipal = new PID();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.idPrincipal.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			idPrincipal: this.idPrincipal
		};
	}
}

export class Response {
	public static Name = 'GetLastConnectionStats';

	private dtLastSessionLogin = new DateTime();
	private dtLastSessionLogout = new DateTime();
	private dtCurrentSessionLogin = new DateTime();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.dtLastSessionLogin.extractFrom(stream);
		this.dtLastSessionLogout.extractFrom(stream);
		this.dtCurrentSessionLogin.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dtLastSessionLogin: this.dtLastSessionLogin,
			dtLastSessionLogout: this.dtLastSessionLogout,
			dtCurrentSessionLogin: this.dtCurrentSessionLogin
		};
	}
}
