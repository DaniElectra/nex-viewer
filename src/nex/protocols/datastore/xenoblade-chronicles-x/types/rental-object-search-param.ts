import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import ResultRange from '@/nex/types/result-range';
import RentalObjectSearchCondition from '@/nex/protocols/datastore/xenoblade-chronicles-x/types/rental-object-search-condition';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'RentalObjectSearchParam';

export default class RentalObjectSearchParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private conditions = new List(new RentalObjectSearchCondition());
	private unknown1 = new List(new UInt32());
	private unknown2 = new UInt8();
	private resultRange = new ResultRange();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.conditions.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
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

		json.__fields.conditions = this.conditions;
		json.__fields.unknown1 = this.unknown1;
		json.__fields.unknown2 = this.unknown2;
		json.__fields.resultRange = this.resultRange;

		return json;
	}
}
