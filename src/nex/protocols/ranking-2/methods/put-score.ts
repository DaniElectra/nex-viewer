import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import Ranking2ScoreData from '@/nex/protocols/ranking-2/types/ranking2-score-data';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PutScore';

	private scoreDataList = new List(new Ranking2ScoreData());
	private nexUniqueId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.scoreDataList.extractFrom(stream);
		this.nexUniqueId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			scoreDataList: this.scoreDataList,
			nexUniqueId: this.nexUniqueId
		};
	}
}

// * No response data
export class Response {
	public static Name = 'PutScore';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
