import CalicoStatsBase from '@/nex/protocols/datastore/splatoon-2/types/calico-stats-base';
import Int32 from '@/nex/types/int32';
import Int8 from '@/nex/types/int8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CalicoGachiStats';

export default class CalicoGachiStats extends CalicoStatsBase {
	public get typeName(): string {
		return className;
	}

	private elapsedTime = new Int32();
	private myTeamCount = new Int8();
	private otherTeamCount = new Int8();
	private udemae = new Int32();
	private estimateGachiPower = new Int32();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.elapsedTime.extractFrom(stream);
		this.myTeamCount.extractFrom(stream);
		this.otherTeamCount.extractFrom(stream);
		this.udemae.extractFrom(stream);
		this.estimateGachiPower.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__parent: super.toJSON(),
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.elapsedTime = this.elapsedTime;
		json.__fields.myTeamCount = this.myTeamCount;
		json.__fields.otherTeamCount = this.otherTeamCount;
		json.__fields.udemae = this.udemae;
		json.__fields.estimateGachiPower = this.estimateGachiPower;

		return json;
	}
}
