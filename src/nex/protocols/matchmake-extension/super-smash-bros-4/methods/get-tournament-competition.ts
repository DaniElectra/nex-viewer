import NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import TournamentCompetition from '@/nex/protocols/matchmake-extension/super-smash-bros-4/types/tournament-competition';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetTournamentCompetition';

	private unknown1 = new UInt32();
	private unknown2 = new UInt8();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown1: this.unknown1,
			unknown2: this.unknown2
		};
	}
}

export class Response {
	public static Name = 'GetTournamentCompetition';

	private competition = new TournamentCompetition();

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
