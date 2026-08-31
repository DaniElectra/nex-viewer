import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import UInt8 from '@/nex/types/uint8';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetEnvironment';

	private uniqueId = new RVString();
	private platform = new UInt8();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uniqueId.extractFrom(stream);
		this.platform.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uniqueId: this.uniqueId,
			platform: this.platform
		};
	}
}

export class Response {
	public static Name = 'GetEnvironment';

	private str = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.str.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			str: this.str
		};
	}
}
