import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import UInt64 from '@/nex/types/uint64';
import LeagueResult from '@/nex/protocols/ranking/splatoon-2/types/league-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetLeagueResult';

	private leagueId = new RVString();
	private tagId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.leagueId.extractFrom(stream);
		this.tagId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			leagueId: this.leagueId,
			tagId: this.tagId
		};
	}
}

export class Response {
	public static Name = 'GetLeagueResult';

	private result = new LeagueResult();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.result.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			result: this.result
		};
	}
}
