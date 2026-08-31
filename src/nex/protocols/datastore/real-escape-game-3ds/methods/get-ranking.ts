import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import CustomRankingData from '@/nex/protocols/datastore/real-escape-game-3ds/types/custom-ranking-data';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetRanking';

	private applicationId = new UInt32();
	private count = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.applicationId.extractFrom(stream);
		this.count.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			applicationId: this.applicationId,
			count: this.count
		};
	}
}

export class Response {
	public static Name = 'GetRanking';

	private pResult = new List(new CustomRankingData());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pResult.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pResult: this.pResult
		};
	}
}
