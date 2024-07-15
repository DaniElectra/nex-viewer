import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import StationURL from '@/nex/types/station-url';
import type RMCMessage from '@/nex/rmc-message';

export class Request {
	public static Name = 'UpdateURLs';

	private vecMyURLs = new List(new StationURL());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title.settings);

		this.vecMyURLs.extractFrom(stream);
	}

	public toJSON(): Record<string, any> {
		return {
			vecMyURLs: this.vecMyURLs
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateURLs';

	constructor() {}

	public toJSON(): Record<string, any> {
		return {};
	}
}