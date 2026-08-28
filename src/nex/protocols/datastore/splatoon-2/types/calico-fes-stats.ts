import CalicoRegularStats from '@/nex/protocols/datastore/splatoon-2/types/calico-regular-stats';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import Int32 from '@/nex/types/int32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CalicoFesStats';

export default class CalicoFesStats extends CalicoRegularStats {
	public get typeName(): string {
		return className;
	}

	private fesId = new UInt32();
	private themeId = new UInt8();
	private fesGrade = new Int32();
	private fesPoint = new Int32();
	private fesPower = new UInt32();
	private maxFesPower = new UInt32();
	private myEstimateFesPower = new Int32();
	private otherEstimateFesPower = new Int32();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.fesId.extractFrom(stream);
		this.themeId.extractFrom(stream);
		this.fesGrade.extractFrom(stream);
		this.fesPoint.extractFrom(stream);
		this.fesPower.extractFrom(stream);
		this.maxFesPower.extractFrom(stream);
		this.myEstimateFesPower.extractFrom(stream);
		this.otherEstimateFesPower.extractFrom(stream);
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

		json.__fields.fesId = this.fesId;
		json.__fields.themeId = this.themeId;
		json.__fields.fesGrade = this.fesGrade;
		json.__fields.fesPoint = this.fesPoint;
		json.__fields.fesPower = this.fesPower;
		json.__fields.maxFesPower = this.maxFesPower;
		json.__fields.myEstimateFesPower = this.myEstimateFesPower;
		json.__fields.otherEstimateFesPower = this.otherEstimateFesPower;

		return json;
	}
}
