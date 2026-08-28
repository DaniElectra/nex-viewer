import NEXByteStream from '@/nex/byte-stream';
import CompetitionRankingUploadScoreParam from '@/nex/protocols/ranking/splatoon/types/competition-ranking-upload-score-param';
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

	private success = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.success.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			success: this.success
		};
	}
}
