import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SearchUsersPlayedCourseParam';

export default class SearchUsersPlayedCourseParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private resultOption = new UInt32();
	private count = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.resultOption.extractFrom(stream);
		this.count.extractFrom(stream);
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

		json.__fields.dataId = this.dataId;
		json.__fields.resultOption = this.resultOption;
		json.__fields.count = this.count;

		return json;
	}
}
