import NEXByteStream from '@/nex/byte-stream';
import EndlessModeStatus from '@/nex/protocols/datastore/super-mario-maker-2/types/endless-mode-status';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetEndlessModeStatus';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetEndlessModeStatus';

	private result = new EndlessModeStatus();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.result.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			result: this.result
		};
	}
}
