import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Float from '@/nex/types/float';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SaveScoreInvasion';

	private id_leaderboard = new UInt32();
	private score = new Float();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.id_leaderboard.extractFrom(stream);
		this.score.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			id_leaderboard: this.id_leaderboard,
			score: this.score
		};
	}
}

// * No response data
export class Response {
	public static Name = 'SaveScoreInvasion';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
