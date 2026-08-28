import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import UInt64 from '@/nex/types/uint64';
import PID from '@/nex/types/pid';
import RatingRankData from '@/nex/protocols/rating/types/rating-rank-data';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetRanking';

	private category = new UInt32();
	private uniqueId = new UInt64();
	private principalId = new PID();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.category.extractFrom(stream);
		this.uniqueId.extractFrom(stream);
		this.principalId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			category: this.category,
			uniqueId: this.uniqueId,
			principalId: this.principalId
		};
	}
}

export class Response {
	public static Name = 'GetRanking';

	private rankData = new RatingRankData();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.rankData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			rankData: this.rankData
		};
	}
}
