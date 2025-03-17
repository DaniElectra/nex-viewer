import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVBuffer from '@/nex/types/buffer';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdatePicture';

	private unknown = new UInt32();
	private picture = new RVBuffer();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.unknown.extractFrom(stream);
		this.picture.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown: this.unknown,
			picture: this.picture
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdatePicture';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}