import NEXByteStream from '@/nex/byte-stream';
import CompetitionRankingGetParam from '@/nex/protocols/ranking/splatoon/types/competition-ranking-get-param';
import List from '@/nex/types/list';
import CompetitionRankingScoreInfo from '@/nex/protocols/ranking/splatoon/types/competition-ranking-score-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetCompetitionRankingScore';

	private param = new CompetitionRankingGetParam();

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
	public static Name = 'GetCompetitionRankingScore';

	private scoreInfo = new List(new CompetitionRankingScoreInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.scoreInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			scoreInfo: this.scoreInfo
		};
	}
}
