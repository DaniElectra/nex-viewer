import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import MatchmakeRefereeStatsTarget from '@/nex/protocols/matchmake-referee/libeagle/types/matchmake-referee-stats-target';
import MatchmakeRefereeStats from '@/nex/protocols/matchmake-referee/libeagle/types/matchmake-referee-stats';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetStatsAll';

	private target = new MatchmakeRefereeStatsTarget();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.target.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			target: this.target
		};
	}
}

export class Response {
	public static Name = 'GetStatsAll';

	private stats = new List(new MatchmakeRefereeStats());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.stats.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			stats: this.stats
		};
	}
}
