import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeleteCachedRanking';

	private rankingType = new RVString();
	private rankingArgs = new List(new RVString());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.rankingType.extractFrom(stream);
		this.rankingArgs.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			rankingType: this.rankingType,
			rankingArgs: this.rankingArgs
		};
	}
}

// * No response data
export class Response {
	public static Name = 'DeleteCachedRanking';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
