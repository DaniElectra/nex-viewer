import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RemoveFriendByPrincipalID';

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

// * No response data
export class Response {
	public static Name = 'RemoveFriendByPrincipalID';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
