import NEXByteStream from '@/nex/byte-stream';
import CompetitionRankingUploadScoreParam from '@/nex/protocols/ranking/mario-kart-8-deluxe/types/competition-ranking-upload-score-param';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UploadCompetitionRankingScore';

	private param = new CompetitionRankingUploadScoreParam();

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
	public static Name = 'UploadCompetitionRankingScore';

	private result = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.result.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			result: this.result
		};
	}
}
