import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import RankingScoreData from '@/nex/protocols/ranking/types/ranking-score-data';
import UInt64 from '@/nex/types/uint64';
import QResult from '@/nex/types/qresult';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UploadScores_Lazy';

	private scores = new List(new RankingScoreData());
	private unknown = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.scores.extractFrom(stream);
		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			scores: this.scores,
			unknown: this.unknown
		};
	}
}

export class Response {
	public static Name = 'UploadScores_Lazy';

	private results = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.results.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			results: this.results
		};
	}
}
