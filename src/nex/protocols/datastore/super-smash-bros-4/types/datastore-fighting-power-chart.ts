import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import DataStoreFightingPowerScore from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-fighting-power-score';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreFightingPowerChart';

export default class DataStoreFightingPowerChart extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private userNum = new UInt32();
	private chart = new List(new DataStoreFightingPowerScore());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.userNum.extractFrom(stream);
		this.chart.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.userNum = this.userNum;
		json.__fields.chart = this.chart;

		return json;
	}
}
