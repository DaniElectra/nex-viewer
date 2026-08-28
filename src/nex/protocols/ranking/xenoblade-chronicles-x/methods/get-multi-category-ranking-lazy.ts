import NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import RankingOrderParam from '@/nex/protocols/ranking/types/ranking-order-param';
import UInt64 from '@/nex/types/uint64';
import RankingResult from '@/nex/protocols/ranking/types/ranking-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetMultiCategoryRanking_Lazy';

	private unknown1 = new UInt8();
	private categories = new List(new UInt32());
	private orderParam = new RankingOrderParam();
	private unknown2 = new UInt64();
	private unknown3 = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown1.extractFrom(stream);
		this.categories.extractFrom(stream);
		this.orderParam.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown1: this.unknown1,
			categories: this.categories,
			orderParam: this.orderParam,
			unknown2: this.unknown2,
			unknown3: this.unknown3
		};
	}
}

export class Response {
	public static Name = 'GetMultiCategoryRanking_Lazy';

	private pResults = new List(new RankingResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pResults.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pResults: this.pResults
		};
	}
}
