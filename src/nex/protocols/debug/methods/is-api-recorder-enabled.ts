import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'IsApiRecorderEnabled';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'IsApiRecorderEnabled';

	private enabled = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.enabled.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			enabled: this.enabled
		};
	}
}
