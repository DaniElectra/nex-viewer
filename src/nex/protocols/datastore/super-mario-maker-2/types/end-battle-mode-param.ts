import DDLClass from '@/nex/types/ddl-class';
import RVMap from '@/nex/types/map';
import UInt64 from '@/nex/types/uint64';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'EndBattleModeParam';

export default class EndBattleModeParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private battleResults = new RVMap(new UInt64(), new UInt8());
	private killCount = new UInt32();
	private killedCount = new UInt32();
	private glicko2Rate = new UInt32();
	private glicko2Deviation = new UInt32();
	private glicko2Volatility = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.battleResults.extractFrom(stream);
		this.killCount.extractFrom(stream);
		this.killedCount.extractFrom(stream);
		this.glicko2Rate.extractFrom(stream);
		this.glicko2Deviation.extractFrom(stream);
		this.glicko2Volatility.extractFrom(stream);
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

		json.__fields.battleResults = this.battleResults;
		json.__fields.killCount = this.killCount;
		json.__fields.killedCount = this.killedCount;
		json.__fields.glicko2Rate = this.glicko2Rate;
		json.__fields.glicko2Deviation = this.glicko2Deviation;
		json.__fields.glicko2Volatility = this.glicko2Volatility;

		return json;
	}
}
