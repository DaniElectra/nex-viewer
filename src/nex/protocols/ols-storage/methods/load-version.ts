import NEXByteStream from '@/nex/byte-stream';
import Int32 from '@/nex/types/int32';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'LoadVersion';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'LoadVersion';

	private version = new Int32();
	private sandboxName = new RVString();
	private applicationMask = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.version.extractFrom(stream);
		this.sandboxName.extractFrom(stream);
		this.applicationMask.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			version: this.version,
			sandboxName: this.sandboxName,
			applicationMask: this.applicationMask
		};
	}
}
