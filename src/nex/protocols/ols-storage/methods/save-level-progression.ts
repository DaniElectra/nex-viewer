import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import OLSLevel from '@/nex/protocols/ols-storage/types/ols-level';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SaveLevelProgression';

	private levels = new List(new OLSLevel());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.levels.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			levels: this.levels
		};
	}
}

// * No response data
export class Response {
	public static Name = 'SaveLevelProgression';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
