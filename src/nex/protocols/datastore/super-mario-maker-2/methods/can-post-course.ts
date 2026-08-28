import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'CanPostCourse';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'CanPostCourse';

	private unknown1 = new Bool();
	private unknown2 = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown1: this.unknown1,
			unknown2: this.unknown2
		};
	}
}
