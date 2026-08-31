import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import UInt16 from '@/nex/types/uint16';
import UInt8 from '@/nex/types/uint8';
import ResultRange from '@/nex/types/result-range';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreGetMetaByUniqueIdParam';

export default class DataStoreGetMetaByUniqueIdParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private uniqueIds = new List(new UInt64());
	private dataTypes = new List(new UInt16());
	private resultOption = new UInt8();
	private resultRange = new ResultRange();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.uniqueIds.extractFrom(stream);
		this.dataTypes.extractFrom(stream);
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

		json.__fields.uniqueIds = this.uniqueIds;
		json.__fields.dataTypes = this.dataTypes;
		json.__fields.resultOption = this.resultOption;
		json.__fields.resultRange = this.resultRange;

		return json;
	}
}
