import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import DateTime from '@/nex/types/datetime';
import ApiCall from '@/nex/protocols/debug/types/api-call';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetApiCalls';

	private pids = new List(new PID());
	private after = new DateTime();
	private before = new DateTime();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pids.extractFrom(stream);
		this.after.extractFrom(stream);
		this.before.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pids: this.pids,
			after: this.after,
			before: this.before
		};
	}
}

export class Response {
	public static Name = 'GetApiCalls';

	private apiCalls = new List(new ApiCall());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.apiCalls.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			apiCalls: this.apiCalls
		};
	}
}
