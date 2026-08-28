import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import Int32 from '@/nex/types/int32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SendPlayReport';

	private playReport = new List(new Int32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.playReport.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			playReport: this.playReport
		};
	}
}

// * No response data
export class Response {
	public static Name = 'SendPlayReport';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
