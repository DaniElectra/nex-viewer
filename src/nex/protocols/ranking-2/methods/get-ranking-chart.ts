import NEXByteStream from '@/nex/byte-stream';
import Ranking2ChartInfoInput from '@/nex/protocols/ranking-2/types/ranking2-chart-info-input';
import Ranking2ChartInfo from '@/nex/protocols/ranking-2/types/ranking2-chart-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetRankingChart';

	private info = new Ranking2ChartInfoInput();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.info.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			info: this.info
		};
	}
}

export class Response {
	public static Name = 'GetRankingChart';

	private chart = new Ranking2ChartInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.chart.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			chart: this.chart
		};
	}
}
