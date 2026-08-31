import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SetCachedRanking';

	private rankingType = new RVString();
	private rankingArgs = new List(new RVString());
	private dataIdLst = new List(new UInt64());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.rankingType.extractFrom(stream);
		this.rankingArgs.extractFrom(stream);
		this.dataIdLst.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			rankingType: this.rankingType,
			rankingArgs: this.rankingArgs,
			dataIdLst: this.dataIdLst
		};
	}
}

// * No response data
export class Response {
	public static Name = 'SetCachedRanking';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
