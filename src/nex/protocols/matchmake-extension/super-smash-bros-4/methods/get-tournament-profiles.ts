import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import TournamentProfileInfo from '@/nex/protocols/matchmake-extension/super-smash-bros-4/types/tournament-profile-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetTournamentProfiles';

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
	public static Name = 'GetTournamentProfiles';

	private profiles = new List(new TournamentProfileInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.profiles.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			profiles: this.profiles
		};
	}
}
