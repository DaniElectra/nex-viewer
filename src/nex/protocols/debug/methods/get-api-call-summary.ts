import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import DateTime from '@/nex/types/datetime';
import Bool from '@/nex/types/bool';
import List from '@/nex/types/list';
import ApiCallSummary from '@/nex/protocols/debug/types/api-call-summary';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetApiCallSummary';

	private pid = new PID();
	private after = new DateTime();
	private before = new DateTime();
	private onlyOverMaxCallCount = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pid.extractFrom(stream);
		this.after.extractFrom(stream);
		this.before.extractFrom(stream);
		this.onlyOverMaxCallCount.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pid: this.pid,
			after: this.after,
			before: this.before,
			onlyOverMaxCallCount: this.onlyOverMaxCallCount
		};
	}
}

export class Response {
	public static Name = 'GetApiCallSummary';

	private apiCallSummaries = new List(new ApiCallSummary());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.apiCallSummaries.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			apiCallSummaries: this.apiCallSummaries
		};
	}
}
