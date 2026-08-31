import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import Bool from '@/nex/types/bool';
import List from '@/nex/types/list';
import CommunityCompetition from '@/nex/protocols/matchmake-extension/super-smash-bros-4/types/community-competition';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SelectCommunityCompetitionByOwner';

	private ownerPIDs = new List(new PID());
	private unknown = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.ownerPIDs.extractFrom(stream);
		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			ownerPIDs: this.ownerPIDs,
			unknown: this.unknown
		};
	}
}

export class Response {
	public static Name = 'SelectCommunityCompetitionByOwner';

	private competitions = new List(new CommunityCompetition());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.competitions.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			competitions: this.competitions
		};
	}
}
