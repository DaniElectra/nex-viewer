import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import DataStoreFightingPowerChart from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-fighting-power-chart';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetFightingPowerChartAll';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetFightingPowerChartAll';

	private pChart = new List(new DataStoreFightingPowerChart());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pChart.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pChart: this.pChart
		};
	}
}
