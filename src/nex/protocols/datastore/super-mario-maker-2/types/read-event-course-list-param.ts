import DDLClass from '@/nex/types/ddl-class';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ReadEventCourseListParam';

export default class ReadEventCourseListParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown.extractFrom(stream);
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

		json.__fields.unknown = this.unknown;

		return json;
	}
}
