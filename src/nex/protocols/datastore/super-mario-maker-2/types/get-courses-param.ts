import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GetCoursesParam';

export default class GetCoursesParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataIDs = new List(new UInt64());
	private resultOptions = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataIDs.extractFrom(stream);
		this.resultOptions.extractFrom(stream);
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

		json.__fields.dataIDs = this.dataIDs;
		json.__fields.resultOptions = this.resultOptions;

		return json;
	}
}
