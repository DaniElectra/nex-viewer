import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdatePreference';

	private showOnlinePresence = new Bool();
	private showCurrentlyPlayingTitle = new Bool();
	private showPlayedTitles = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.showOnlinePresence.extractFrom(stream);
		this.showCurrentlyPlayingTitle.extractFrom(stream);
		this.showPlayedTitles.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			showOnlinePresence: this.showOnlinePresence,
			showCurrentlyPlayingTitle: this.showCurrentlyPlayingTitle,
			showPlayedTitles: this.showPlayedTitles
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdatePreference';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}