import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import Int64 from '@/nex/types/int64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetWorldPlayReport';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetWorldPlayReport';

	private pPlayReport = new List(new Int64());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pPlayReport.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pPlayReport: this.pPlayReport
		};
	}
}
