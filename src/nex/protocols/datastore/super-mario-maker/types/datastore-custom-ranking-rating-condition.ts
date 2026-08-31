import DDLClass from '@/nex/types/ddl-class';
import Int8 from '@/nex/types/int8';
import Int32 from '@/nex/types/int32';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreCustomRankingRatingCondition';

export default class DataStoreCustomRankingRatingCondition extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private slot = new Int8();
	private minValue = new Int32();
	private maxValue = new Int32();
	private minCount?: UInt32; // * Revision 1
	private maxCount?: UInt32; // * Revision 1

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.slot.extractFrom(stream);
		this.minValue.extractFrom(stream);
		this.maxValue.extractFrom(stream);

		if (this.revision >= 1) {
			this.minCount = new UInt32();
			this.minCount.extractFrom(stream);

			this.maxCount = new UInt32();
			this.maxCount.extractFrom(stream);
		}
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

		json.__fields.slot = this.slot;
		json.__fields.minValue = this.minValue;
		json.__fields.maxValue = this.maxValue;

		if (this.minCount !== undefined) {
			json.__fields.minCount = this.minCount;
		}

		if (this.maxCount !== undefined) {
			json.__fields.maxCount = this.maxCount;
		}

		return json;
	}
}
