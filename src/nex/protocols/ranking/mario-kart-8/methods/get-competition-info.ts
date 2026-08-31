import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import CompetitionRankingInfoGetParam from '@/nex/protocols/ranking/mario-kart-8/types/competition-ranking-info-get-param';
import CompetitionRankingInfo from '@/nex/protocols/ranking/mario-kart-8/types/competition-ranking-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetCompetitionInfo';

	private param = new CompetitionRankingInfoGetParam();

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
	public static Name = 'GetCompetitionInfo';

	private info = new List(new CompetitionRankingInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.info.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			info: this.info
		};
	}
}
