import CalicoGachiStats from '@/nex/protocols/datastore/splatoon-2/types/calico-gachi-stats';
import RVString from '@/nex/types/string';
import UInt64 from '@/nex/types/uint64';
import Int32 from '@/nex/types/int32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CalicoLeagueStats';

export default class CalicoLeagueStats extends CalicoGachiStats {
	public get typeName(): string {
		return className;
	}

	private leagueId = new RVString();
	private tagId = new UInt64();
	private leaguePoint = new Int32();
	private maxLeaguePoint = new Int32();
	private myEstimateLeaguePoint = new Int32();
	private otherEstimateLeaguePoint = new Int32();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.leagueId.extractFrom(stream);
		this.tagId.extractFrom(stream);
		this.leaguePoint.extractFrom(stream);
		this.maxLeaguePoint.extractFrom(stream);
		this.myEstimateLeaguePoint.extractFrom(stream);
		this.otherEstimateLeaguePoint.extractFrom(stream);
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

		json.__fields.leagueId = this.leagueId;
		json.__fields.tagId = this.tagId;
		json.__fields.leaguePoint = this.leaguePoint;
		json.__fields.maxLeaguePoint = this.maxLeaguePoint;
		json.__fields.myEstimateLeaguePoint = this.myEstimateLeaguePoint;
		json.__fields.otherEstimateLeaguePoint = this.otherEstimateLeaguePoint;

		return json;
	}
}
