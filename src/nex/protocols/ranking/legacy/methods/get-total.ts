import NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';
import UInt16 from '@/nex/types/uint16';
import UInt32 from '@/nex/types/uint32';
import Int16 from '@/nex/types/int16';
import List from '@/nex/types/list';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetTotal';

	private category: List<UInt16> | UInt32;
	private unknown1 = new UInt8();
	private unknown2 = new UInt8();
	private unknown3 = new UInt8();
	private unknown4 = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		// * NEX 1 stores the category as a List<Uint16>, NEX 2 stores it as a Uint32
		if (Number(stream.title.libraryVersions.ranking.split('.')[0]) === 1) {
			this.category = new List(new UInt16());
		} else {
			this.category = new UInt32();
		}

		this.category.extractFrom(stream);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.unknown4.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			category: this.category,
			unknown1: this.unknown1,
			unknown2: this.unknown2,
			unknown3: this.unknown3,
			unknown4: this.unknown4
		};
	}
}

export class Response {
	public static Name = 'GetTotal';

	private resultCode = new Int16();
	private totalCount = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.resultCode.extractFrom(stream);
		this.totalCount.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			resultCode: this.resultCode,
			totalCount: this.totalCount
		};
	}
}
