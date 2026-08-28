import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import UInt16 from '@/nex/types/uint16';
import UInt8 from '@/nex/types/uint8';
import ResultRange from '@/nex/types/result-range';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreGetMetaByOwnerIdParam';

export default class DataStoreGetMetaByOwnerIdParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private ownerIds = new List(new UInt32());
	private dataTypes = new List(new UInt16());
	private resultOption = new UInt8();
	private resultRange = new ResultRange();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.ownerIds.extractFrom(stream);
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

		json.__fields.ownerIds = this.ownerIds;
		json.__fields.dataTypes = this.dataTypes;
		json.__fields.resultOption = this.resultOption;
		json.__fields.resultRange = this.resultRange;

		return json;
	}
}
