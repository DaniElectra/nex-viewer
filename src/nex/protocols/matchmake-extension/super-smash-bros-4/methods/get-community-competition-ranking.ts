import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import CommunityCompetitionRankData from '@/nex/protocols/matchmake-extension/super-smash-bros-4/types/community-competition-rank-data';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetCommunityCompetitionRanking';

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
	public static Name = 'GetCommunityCompetitionRanking';

	private rankings = new List(new CommunityCompetitionRankData());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.rankings.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			rankings: this.rankings
		};
	}
}
