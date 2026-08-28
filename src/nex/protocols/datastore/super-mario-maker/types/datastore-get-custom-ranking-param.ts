import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import ResultRange from '@/nex/types/result-range';
import DataStoreCustomRankingRatingCondition from '@/nex/protocols/datastore/super-mario-maker/types/datastore-custom-ranking-rating-condition';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreGetCustomRankingParam';

export default class DataStoreGetCustomRankingParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private applicationId = new UInt32();
	private condition = new DataStoreCustomRankingRatingCondition();
	private resultOption = new UInt8();
	private resultRange = new ResultRange();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.applicationId.extractFrom(stream);
		this.condition.extractFrom(stream);
		this.resultOption.extractFrom(stream);
		this.resultRange.extractFrom(stream);
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

		json.__fields.applicationId = this.applicationId;
		json.__fields.condition = this.condition;
		json.__fields.resultOption = this.resultOption;
		json.__fields.resultRange = this.resultRange;

		return json;
	}
}
