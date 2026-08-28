import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import OLSCompetition from '@/nex/protocols/ols-storage/rayman-legends-challenges-app/types/ols-competition';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'QueryCompetitionOfTheDay';

	private id_competition_meta = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.id_competition_meta.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			id_competition_meta: this.id_competition_meta
		};
	}
}

export class Response {
	public static Name = 'QueryCompetitionOfTheDay';

	private competition = new OLSCompetition();
	private remaningSeconds = new UInt32();
	private tomorrow = new OLSCompetition();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.competition.extractFrom(stream);
		this.remaningSeconds.extractFrom(stream);
		this.tomorrow.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			competition: this.competition,
			remaningSeconds: this.remaningSeconds,
			tomorrow: this.tomorrow
		};
	}
}
