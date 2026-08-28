import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SaveLocale';

	private localeCode = new RVString();
	private playerName = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.localeCode.extractFrom(stream);
		this.playerName.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			localeCode: this.localeCode,
			playerName: this.playerName
		};
	}
}

// * No response data
export class Response {
	public static Name = 'SaveLocale';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
