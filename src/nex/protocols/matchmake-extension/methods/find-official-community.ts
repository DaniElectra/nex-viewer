import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import ResultRange from '@/nex/types/result-range';
import List from '@/nex/types/list';
import PersistentGathering from '@/nex/protocols/match-making/types/persistent-gathering';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/matchmake-extension/find-official-community';

export class Request {
	public static Name = 'FindOfficialCommunity';

	private isAvailableOnly = new Bool();
	private resultRange = new ResultRange();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.isAvailableOnly.extractFrom(stream);
		this.resultRange.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			isAvailableOnly: this.isAvailableOnly,
			resultRange: this.resultRange
		};
	}
}

export class Response {
	public static Name = 'FindOfficialCommunity';

	private lstCommunity = new List(new PersistentGathering());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstCommunity.extractFrom(stream);
	}

	public toJSON(): RMCs.Response {
		return {
			lstCommunity: this.lstCommunity
		};
	}
}