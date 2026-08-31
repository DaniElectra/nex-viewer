import NEXByteStream from '@/nex/byte-stream';
import Ranking2GetByListParam from '@/nex/protocols/ranking-2/types/ranking2-get-by-list-param';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import Ranking2Info from '@/nex/protocols/ranking-2/types/ranking2-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetRankingByPrincipalId';

	private getParam = new Ranking2GetByListParam();
	private principalIdList = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.getParam.extractFrom(stream);
		this.principalIdList.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			getParam: this.getParam,
			principalIdList: this.principalIdList
		};
	}
}

export class Response {
	public static Name = 'GetRankingByPrincipalId';

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
