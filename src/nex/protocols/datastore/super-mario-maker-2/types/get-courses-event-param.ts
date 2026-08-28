import DDLClass from '@/nex/types/ddl-class';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GetCoursesEventParam';

export default class GetCoursesEventParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);
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

		return json;
	}
}
