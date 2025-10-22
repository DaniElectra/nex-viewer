import NEXByteStream from '@/nex/byte-stream';
import NintendoPresenceV2 from '@/nex/protocols/friends-wiiu/types/nintendo-presence-v2';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdatePresence';

	private nintendoPresence = new NintendoPresenceV2();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.nintendoPresence.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			nintendoPresence: this.nintendoPresence
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdatePresence';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
