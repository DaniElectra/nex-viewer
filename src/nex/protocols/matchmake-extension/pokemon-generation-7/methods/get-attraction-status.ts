import NEXByteStream from '@/nex/byte-stream';
import UInt16 from '@/nex/types/uint16';
import AttractionStatus from '@/nex/protocols/matchmake-extension/pokemon-generation-7/types/attraction-status';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetAttractionStatus';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetAttractionStatus';

	private attractionStatus = new AttractionStatus();
	private refreshInterval = new UInt16();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.attractionStatus.extractFrom(stream);
		this.refreshInterval.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			attractionStatus: this.attractionStatus,
			refreshInterval: this.refreshInterval
		};
	}
}
