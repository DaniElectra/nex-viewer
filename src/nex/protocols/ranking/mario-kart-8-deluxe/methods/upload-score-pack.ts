import NEXByteStream from '@/nex/byte-stream';
import RankingScoreData from '@/nex/protocols/ranking/types/ranking-score-data';
import QBuffer from '@/nex/types/qbuffer';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UploadScorePack';

	private param = new RankingScoreData();
	private metadata = new QBuffer();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
		this.metadata.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param,
			metadata: this.metadata
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UploadScorePack';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
