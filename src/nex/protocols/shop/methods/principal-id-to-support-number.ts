import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PrincipalIDToSupportNumber';

	private pid = new PID();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pid.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pid: this.pid
		};
	}
}

export class Response {
	public static Name = 'PrincipalIDToSupportNumber';

	private supportNumber = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.supportNumber.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			supportNumber: this.supportNumber
		};
	}
}
