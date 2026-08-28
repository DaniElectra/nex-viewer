import NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';
import UInt16 from '@/nex/types/uint16';
import UInt32 from '@/nex/types/uint32';
import Int16 from '@/nex/types/int16';
import List from '@/nex/types/list';
import RankingOrderParam from '@/nex/protocols/ranking/legacy/types/ranking-order-param';
import RankingData from '@/nex/protocols/ranking/legacy/types/ranking-data';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetScore';

	private rankingMode = new UInt8();
	private category: List<UInt16> | UInt32;
	private rankingOrderParam = new RankingOrderParam();
	private offset = new UInt32();
	private length = new UInt8();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.rankingMode.extractFrom(stream);

		// * NEX 1 stores the category as a List<Uint16>, NEX 2 stores it as a Uint32
		if (Number(stream.title.libraryVersions.ranking.split('.')[0]) === 1) {
			this.category = new List(new UInt16());
		} else {
			this.category = new UInt32();
		}

		this.category.extractFrom(stream);

		this.rankingOrderParam.extractFrom(stream);
		this.offset.extractFrom(stream);
		this.length.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			rankingMode: this.rankingMode,
			category: this.category,
			rankingOrderParam: this.rankingOrderParam,
			offset: this.offset,
			length: this.length
		};
	}
}

export class Response {
	public static Name = 'GetScore';

	private resultCode = new Int16();
	private rankDataList = new List(new RankingData());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.resultCode.extractFrom(stream);
		this.rankDataList.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			resultCode: this.resultCode,
			rankDataList: this.rankDataList
		};
	}
}
