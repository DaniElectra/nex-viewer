import NEXByteStream from '@/nex/byte-stream';
import SimpleSearchObject from '@/nex/protocols/matchmake-extension/mario-kart-8-deluxe/types/simple-search-object';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CreateCompetition';

	private competition = new SimpleSearchObject();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.competition.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			competition: this.competition
		};
	}
}

export class Response {
	public static Name = 'CreateCompetition';

	private competition = new SimpleSearchObject();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.competition.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			competition: this.competition
		};
	}
}
