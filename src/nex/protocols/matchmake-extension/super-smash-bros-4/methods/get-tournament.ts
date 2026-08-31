import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Tournament from '@/nex/protocols/matchmake-extension/super-smash-bros-4/types/tournament';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetTournament';

	private unknown = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown: this.unknown
		};
	}
}

export class Response {
	public static Name = 'GetTournament';

	private tournament = new Tournament();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.tournament.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			tournament: this.tournament
		};
	}
}
