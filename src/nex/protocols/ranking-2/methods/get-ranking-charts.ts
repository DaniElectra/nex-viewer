import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import Ranking2ChartInfoInput from '@/nex/protocols/ranking-2/types/ranking2-chart-info-input';
import Ranking2ChartInfo from '@/nex/protocols/ranking-2/types/ranking2-chart-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetRankingCharts';

	private infoArray = new List(new Ranking2ChartInfoInput());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.infoArray.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			infoArray: this.infoArray
		};
	}
}

export class Response {
	public static Name = 'GetRankingCharts';

	private chartArray = new List(new Ranking2ChartInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.chartArray.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			chartArray: this.chartArray
		};
	}
}
