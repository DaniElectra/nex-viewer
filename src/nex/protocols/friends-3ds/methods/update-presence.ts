import NEXByteStream from '@/nex/byte-stream';
import NintendoPresence from '@/nex/protocols/friends-3ds/types/nintendo-presence';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdatePresence';

	private presenceInfo = new NintendoPresence();
	private showCurrentlyPlayingTitle = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!!);

		this.presenceInfo.extractFrom(stream);
		this.showCurrentlyPlayingTitle.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			presenceInfo: this.presenceInfo,
			showCurrentlyPlayingTitle: this.showCurrentlyPlayingTitle
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
