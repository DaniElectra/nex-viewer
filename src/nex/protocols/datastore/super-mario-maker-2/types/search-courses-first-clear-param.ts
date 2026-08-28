import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import ResultRange from '@/nex/types/result-range';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SearchCoursesFirstClearParam';

export default class SearchCoursesFirstClearParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new UInt64();
	private unknown2 = new UInt32();
	private resultRange = new ResultRange();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

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

		json.__fields.unknown1 = this.unknown1;
		json.__fields.unknown2 = this.unknown2;
		json.__fields.resultRange = this.resultRange;

		return json;
	}
}
