import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// * No request data
export class Request {
	public static Name = 'GetPrivacyLevel';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetPrivacyLevel';

	private privacyLevel = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.privacyLevel.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			privacyLevel: this.privacyLevel
		};
	}
}
