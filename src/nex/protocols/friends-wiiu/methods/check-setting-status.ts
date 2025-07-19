import NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'CheckSettingStatus';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'CheckSettingStatus';

	private unknown = new UInt8();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown: this.unknown
		};
	}
}
