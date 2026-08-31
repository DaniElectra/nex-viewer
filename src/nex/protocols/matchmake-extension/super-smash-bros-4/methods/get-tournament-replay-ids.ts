import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import UInt64 from '@/nex/types/uint64';
import List from '@/nex/types/list';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetTournamentReplayIds';

	private unknown = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown: this.unknown
		};
	}
}

export class Response {
	public static Name = 'GetTournamentReplayIds';

	private replayIDs = new List(new UInt64());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.replayIDs.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			replayIDs: this.replayIDs
		};
	}
}
