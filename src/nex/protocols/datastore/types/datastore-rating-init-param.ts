import Structure from '@/nex/types/structure';
import UInt8 from '@/nex/types/uint8';
import Int64 from '@/nex/types/int64';
import Int32 from '@/nex/types/int32';
import Int8 from '@/nex/types/int8';
import Int16 from '@/nex/types/int16';
import type NEXByteStream from '@/nex/byte-stream';

export default class DataStoreRatingInitParam extends Structure {
	public readonly typeName = 'DataStoreRatingInitParam';

	private flag = new UInt8();
	private internalFlag = new UInt8();
	private lockType = new UInt8();
	private initialValue = new Int64();
	private rangeMin = new Int32();
	private rangeMax = new Int32();
	private periodHour = new Int8();
	private periodDuration = new Int16();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.flag.extractFrom(stream);
		this.internalFlag.extractFrom(stream);
		this.lockType.extractFrom(stream);
		this.initialValue.extractFrom(stream);
		this.rangeMin.extractFrom(stream);
		this.rangeMax.extractFrom(stream);
		this.periodHour.extractFrom(stream);
		this.periodDuration.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {}
		};

		json.__fields.flag = this.flag;
		json.__fields.internalFlag = this.internalFlag;
		json.__fields.lockType = this.lockType;
		json.__fields.initialValue = this.initialValue;
		json.__fields.rangeMin = this.rangeMin;
		json.__fields.rangeMax = this.rangeMax;
		json.__fields.periodHour = this.periodHour;
		json.__fields.periodDuration = this.periodDuration;

		return json;
	}
}
