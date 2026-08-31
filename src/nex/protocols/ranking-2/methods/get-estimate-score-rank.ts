import NEXByteStream from '@/nex/byte-stream';
import Ranking2EstimateScoreRankInput from '@/nex/protocols/ranking-2/types/ranking2-estimate-score-rank-input';
import Ranking2EstimateScoreRankOutput from '@/nex/protocols/ranking-2/types/ranking2-estimate-score-rank-output';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetEstimateScoreRank';

	private input = new Ranking2EstimateScoreRankInput();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.input.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			input: this.input
		};
	}
}

export class Response {
	public static Name = 'GetEstimateScoreRank';

	private output = new Ranking2EstimateScoreRankOutput();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.output.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			output: this.output
		};
	}
}
