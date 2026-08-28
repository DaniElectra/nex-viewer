import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import CustomRankingEntryParam from '@/nex/protocols/datastore/real-escape-game-3ds/types/custom-ranking-entry-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'EntryRanking';

	private applicationId = new UInt32();
	private param = new CustomRankingEntryParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.applicationId.extractFrom(stream);
		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			applicationId: this.applicationId,
			param: this.param
		};
	}
}

// * No response data
export class Response {
	public static Name = 'EntryRanking';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
