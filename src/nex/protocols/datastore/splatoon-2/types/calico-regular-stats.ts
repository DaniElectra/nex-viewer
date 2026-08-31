import CalicoStatsBase from '@/nex/protocols/datastore/splatoon-2/types/calico-stats-base';
import Int32 from '@/nex/types/int32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CalicoRegularStats';

export default class CalicoRegularStats extends CalicoStatsBase {
	public get typeName(): string {
		return className;
	}

	private myTeamPercentage = new Int32();
	private otherTeamPercentage = new Int32();
	private winMeter = new Int32();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.myTeamPercentage.extractFrom(stream);
		this.otherTeamPercentage.extractFrom(stream);
		this.winMeter.extractFrom(stream);
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

		json.__fields.myTeamPercentage = this.myTeamPercentage;
		json.__fields.otherTeamPercentage = this.otherTeamPercentage;
		json.__fields.winMeter = this.winMeter;

		return json;
	}
}
