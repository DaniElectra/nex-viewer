import NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import DataStoreFightingPowerScore from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-fighting-power-score';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetFightingPowerChart';

	private mode = new UInt8();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.mode.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			mode: this.mode
		};
	}
}

export class Response {
	public static Name = 'GetFightingPowerChart';

	private pUserNum = new UInt32();
	private pChart = new List(new DataStoreFightingPowerScore());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pUserNum.extractFrom(stream);
		this.pChart.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pUserNum: this.pUserNum,
			pChart: this.pChart
		};
	}
}
