import DDLClass from '@/nex/types/ddl-class';
import UInt16 from '@/nex/types/uint16';
import RVBuffer from '@/nex/types/buffer';
import ResultRange from '@/nex/types/result-range';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreSearchHouseParam';

export default class DataStoreSearchHouseParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataType = new UInt16();
	private resultOrderColumns = new RVBuffer(); // * Is this actually a List<UInt8>?
	private resultRange = new ResultRange();
	private resultOption = new UInt8();
	private region = new UInt8();
	private country = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataType.extractFrom(stream);
		this.resultOrderColumns.extractFrom(stream);
		this.resultRange.extractFrom(stream);
		this.resultOption.extractFrom(stream);
		this.region.extractFrom(stream);
		this.country.extractFrom(stream);
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

		json.__fields.dataType = this.dataType;
		json.__fields.resultOrderColumns = this.resultOrderColumns;
		json.__fields.resultRange = this.resultRange;
		json.__fields.resultOption = this.resultOption;
		json.__fields.region = this.region;
		json.__fields.country = this.country;

		return json;
	}
}
