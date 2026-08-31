import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetNumberOfMatchmakeSessionsWithGameModes';

	private gameModes = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.gameModes.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gameModes: this.gameModes
		};
	}
}

export class Response {
	public static Name = 'GetNumberOfMatchmakeSessionsWithGameModes';

	private sessionCounts = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.sessionCounts.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			sessionCounts: this.sessionCounts
		};
	}
}
