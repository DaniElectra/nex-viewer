import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetApplicationConfig';

	private applicationId = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.applicationId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			applicationId: this.applicationId
		};
	}
}

export class Response {
	public static Name = 'GetApplicationConfig';

	private config = new List(new RVString());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.config.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			config: this.config
		};
	}
}
