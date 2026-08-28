import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import ResultRange from '@/nex/types/result-range';
import List from '@/nex/types/list';
import PersistentGathering from '@/nex/protocols/match-making/types/persistent-gathering';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'FindCommunityByOwner';

	private id = new UInt64();
	private resultRange = new ResultRange();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.id.extractFrom(stream);
		this.resultRange.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			id: this.id,
			resultRange: this.resultRange
		};
	}
}

export class Response {
	public static Name = 'FindCommunityByOwner';

	private lstCommunity = new List(new PersistentGathering());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.lstCommunity.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstCommunity: this.lstCommunity
		};
	}
}
