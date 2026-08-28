import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Int16 from '@/nex/types/int16';
import List from '@/nex/types/list';
import RankingScoreWithLimit from '@/nex/protocols/ranking/legacy/types/ranking-score-with-limit';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UploadScoresWithLimit';

	private uniqueID = new UInt32();
	private scores = new List(new RankingScoreWithLimit());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uniqueID.extractFrom(stream);
		this.scores.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uniqueID: this.uniqueID,
			scores: this.scores
		};
	}
}

export class Response {
	public static Name = 'UploadScoresWithLimit';

	private resultCode = new Int16();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.resultCode.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			resultCode: this.resultCode
		};
	}
}
