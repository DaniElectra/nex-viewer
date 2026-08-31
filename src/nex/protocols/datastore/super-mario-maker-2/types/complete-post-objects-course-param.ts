import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import UInt64 from '@/nex/types/uint64';
import PreparePostCourseParam from '@/nex/protocols/datastore/super-mario-maker-2/types/prepare-post-course-param';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CompletePostObjectsCourseParam';

export default class CompletePostObjectsCourseParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new RVString();
	private unknown2 = new RVString();
	private unknown3 = new RVString();
	private unknown4 = new RVString();
	private unknown5 = new RVString();
	private unknown6 = new UInt64();
	private courseParam = new PreparePostCourseParam();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.unknown4.extractFrom(stream);
		this.unknown5.extractFrom(stream);
		this.unknown6.extractFrom(stream);
		this.courseParam.extractFrom(stream);
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
		json.__fields.unknown3 = this.unknown3;
		json.__fields.unknown4 = this.unknown4;
		json.__fields.unknown5 = this.unknown5;
		json.__fields.unknown6 = this.unknown6;
		json.__fields.courseParam = this.courseParam;

		return json;
	}
}
