import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GetUserOrCourseParam';

export default class GetUserOrCourseParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private codeString = new RVString();
	private userResultOption = new UInt32();
	private courseResultOption = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.codeString.extractFrom(stream);
		this.userResultOption.extractFrom(stream);
		this.courseResultOption.extractFrom(stream);
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

		json.__fields.codeString = this.codeString;
		json.__fields.userResultOption = this.userResultOption;
		json.__fields.courseResultOption = this.courseResultOption;

		return json;
	}
}
