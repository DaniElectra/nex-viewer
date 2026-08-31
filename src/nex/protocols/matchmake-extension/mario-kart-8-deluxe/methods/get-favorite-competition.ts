import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import SimpleSearchObject from '@/nex/protocols/matchmake-extension/mario-kart-8-deluxe/types/simple-search-object';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetFavoriteCompetition';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetFavoriteCompetition';

	private favoriteCompetitions = new List(new SimpleSearchObject());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.favoriteCompetitions.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			favoriteCompetitions: this.favoriteCompetitions
		};
	}
}
