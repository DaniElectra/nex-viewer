import NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetUserNameNgType';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetUserNameNgType';

	private type = new UInt8();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.type.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			type: this.type
		};
	}
}
