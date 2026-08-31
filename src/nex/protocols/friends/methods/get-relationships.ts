import NEXByteStream from '@/nex/byte-stream';
import ResultRange from '@/nex/types/result-range';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import RelationshipData from '@/nex/protocols/friends/types/relationship-data';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetRelationships';

	private resultRange = new ResultRange();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.resultRange.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			resultRange: this.resultRange
		};
	}
}

export class Response {
	public static Name = 'GetRelationships';

	private uiTotalCount = new UInt32();
	private lstRelationshipsList = new List(new RelationshipData());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uiTotalCount.extractFrom(stream);
		this.lstRelationshipsList.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiTotalCount: this.uiTotalCount,
			lstRelationshipsList: this.lstRelationshipsList
		};
	}
}
