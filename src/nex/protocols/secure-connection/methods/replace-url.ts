import NEXByteStream from '@/nex/byte-stream';
import StationURL from '@/nex/types/station-url';
import type RMCMessage from '@/nex/rmc-message';

export class Request {
	public static Name = 'ReplaceURL';

	private target = new StationURL();
	private url = new StationURL();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title.settings);

		this.target.extractFrom(stream);
		this.url.extractFrom(stream);
	}

	public toJSON(): Record<string, any> {
		return {
			target: this.target,
			url: this.url
		};
	}
}

// * No response data
export class Response {
	public static Name = 'ReplaceURL';

	constructor() {}

	public toJSON(): Record<string, any> {
		return {};
	}
}