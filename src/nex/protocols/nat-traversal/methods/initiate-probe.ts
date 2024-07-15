import NEXByteStream from '@/nex/byte-stream';
import StationURL from '@/nex/types/station-url';
import type RMCMessage from '@/nex/rmc-message';

export class Request {
	public static Name = 'InitiateProbe';

	private urlStationToProbe = new StationURL();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title.settings);

		this.urlStationToProbe.extractFrom(stream);
	}

	public toJSON(): Record<string, any> {
		return {
			urlStationToProbe: this.urlStationToProbe
		};
	}
}

// * No response data
export class Response {
	public static Name = 'InitiateProbe';

	constructor() {}

	public toJSON(): Record<string, any> {
		return {};
	}
}