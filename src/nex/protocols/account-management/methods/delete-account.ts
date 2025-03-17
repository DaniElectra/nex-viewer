import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeleteAccount';

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

// * No response data
export class Response {
	public static Name = 'DeleteAccount';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}