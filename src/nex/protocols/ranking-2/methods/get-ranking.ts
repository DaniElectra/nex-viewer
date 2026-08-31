import NEXByteStream from '@/nex/byte-stream';
import Ranking2GetParam from '@/nex/protocols/ranking-2/types/ranking2-get-param';
import Ranking2Info from '@/nex/protocols/ranking-2/types/ranking2-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetRanking';

	private getParam = new Ranking2GetParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.getParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			getParam: this.getParam
		};
	}
}

export class Response {
	public static Name = 'GetRanking';

	private rankingInfo = new Ranking2Info();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.rankingInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			rankingInfo: this.rankingInfo
		};
	}
}
