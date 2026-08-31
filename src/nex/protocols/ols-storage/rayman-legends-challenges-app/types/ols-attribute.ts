import DDLClass from '@/nex/types/ddl-class';
import Int8 from '@/nex/types/int8';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'OLSAttribute';

export default class OLSAttribute extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private attribute_type = new Int8();
	private attribute_value = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.attribute_type.extractFrom(stream);
		this.attribute_value.extractFrom(stream);
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

		json.__fields.attribute_type = this.attribute_type;
		json.__fields.attribute_value = this.attribute_value;

		return json;
	}
}
