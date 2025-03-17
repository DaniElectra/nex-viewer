import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SendInvitation';

	private pids = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pids.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pids: this.pids
		};
	}
}

// * No response data
export class Response {
	public static Name = 'SendInvitation';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}