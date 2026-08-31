import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetStatus';

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
	public static Name = 'GetStatus';

	private strStatus = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.strStatus.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			strStatus: this.strStatus
		};
	}
}
