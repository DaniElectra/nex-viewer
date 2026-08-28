import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'UpdateCourseTagParam';

export default class UpdateCourseTagParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private tagId1 = new UInt8();
	private tagId2 = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.tagId1.extractFrom(stream);
		this.tagId2.extractFrom(stream);
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
		json.__fields.tagId1 = this.tagId1;
		json.__fields.tagId2 = this.tagId2;

		return json;
	}
}
