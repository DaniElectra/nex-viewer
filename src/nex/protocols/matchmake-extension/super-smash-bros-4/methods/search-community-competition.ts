import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import SearchCommunityCompetitionParam from '@/nex/protocols/matchmake-extension/super-smash-bros-4/types/search-community-competition-param';
import CommunityCompetition from '@/nex/protocols/matchmake-extension/super-smash-bros-4/types/community-competition';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchCommunityCompetition';

	private param = new SearchCommunityCompetitionParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param
		};
	}
}

export class Response {
	public static Name = 'SearchCommunityCompetition';

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
