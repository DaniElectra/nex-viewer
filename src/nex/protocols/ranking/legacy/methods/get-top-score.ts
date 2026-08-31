import NEXByteStream from '@/nex/byte-stream';
import UInt16 from '@/nex/types/uint16';
import UInt32 from '@/nex/types/uint32';
import Int16 from '@/nex/types/int16';
import List from '@/nex/types/list';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetTopScore';

	private uniqueID = new UInt32();
	private category: List<UInt16> | UInt32;

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uniqueID.extractFrom(stream);

		// * NEX 1 stores the category as a List<Uint16>, NEX 2 stores it as a Uint32
		if (Number(stream.title.libraryVersions.ranking.split('.')[0]) === 1) {
			this.category = new List(new UInt16());
		} else {
			this.category = new UInt32();
		}

		this.category.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uniqueID: this.uniqueID,
			category: this.category
		};
	}
}

export class Response {
	public static Name = 'GetTopScore';

	private resultCode = new Int16();
	private scores = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.resultCode.extractFrom(stream);
		this.scores.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			resultCode: this.resultCode,
			scores: this.scores
		};
	}
}
