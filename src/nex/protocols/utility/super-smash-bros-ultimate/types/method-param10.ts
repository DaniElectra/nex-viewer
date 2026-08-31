import DDLClass from '@/nex/types/ddl-class';
import UnknownStruct from '@/nex/protocols/utility/super-smash-bros-ultimate/types/unknown-struct';
import Int32 from '@/nex/types/int32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MethodParam10';

export default class MethodParam10 extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new UnknownStruct();
	private unknown2 = new Int32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
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

		return json;
	}
}
