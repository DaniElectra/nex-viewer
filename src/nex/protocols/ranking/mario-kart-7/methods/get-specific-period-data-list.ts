import NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import Int16 from '@/nex/types/int16';
import List from '@/nex/types/list';
import RankingData from '@/nex/protocols/ranking/legacy/types/ranking-data';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetSpecificPeriodDataList';

	private uniqueID = new UInt32();
	private category = new UInt32();
	private unknown1 = new UInt8();
	private unknown2 = new UInt8();
	private unknown3 = new UInt8();
	private offset = new UInt32();
	private length = new UInt8();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uniqueID.extractFrom(stream);
		this.category.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.offset.extractFrom(stream);
		this.length.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uniqueID: this.uniqueID,
			category: this.category,
			unknown1: this.unknown1,
			unknown2: this.unknown2,
			unknown3: this.unknown3,
			offset: this.offset,
			length: this.length
		};
	}
}

export class Response {
	public static Name = 'GetSpecificPeriodDataList';

	private resultCode = new Int16();
	private myScore = new UInt32();
	private rankDataList = new List(new RankingData());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.resultCode.extractFrom(stream);
		this.myScore.extractFrom(stream);
		this.rankDataList.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			resultCode: this.resultCode,
			myScore: this.myScore,
			rankDataList: this.rankDataList
		};
	}
}
