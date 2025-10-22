import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateStatus';

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

// * No response data
export class Response {
	public static Name = 'UpdateStatus';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
