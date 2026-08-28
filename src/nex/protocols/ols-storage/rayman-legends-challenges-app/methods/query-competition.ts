import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import OLSCompetition from '@/nex/protocols/ols-storage/rayman-legends-challenges-app/types/ols-competition';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'QueryCompetition';

	private id_competition = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.id_competition.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			id_competition: this.id_competition
		};
	}
}

export class Response {
	public static Name = 'QueryCompetition';

	private competition = new OLSCompetition();

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
