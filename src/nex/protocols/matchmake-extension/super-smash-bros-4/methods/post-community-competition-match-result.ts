import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import CommunityCompetitionMatchResult from '@/nex/protocols/matchmake-extension/super-smash-bros-4/types/community-competition-match-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PostCommunityCompetitionMatchResult';

	private matchResult = new CommunityCompetitionMatchResult();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.matchResult.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			matchResult: this.matchResult
		};
	}
}

export class Response {
	public static Name = 'PostCommunityCompetitionMatchResult';

	private unknown1 = new Bool();
	private unknown2 = new Bool();

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
