import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'Log';

	private strLine = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!!);

		this.strLine.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			strLine: this.strLine
		};
	}
}

// * No response data
export class Response {
	public static Name = 'Log';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
