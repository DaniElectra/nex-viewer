import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'UnknownStructure0x17';

export default class UnknownStructure0x17 extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private id = new UInt32();
	private unknown1 = new UInt32();
	private unknown2 = new List(new UInt32());
	private unknown3 = new UInt8();
	private unknown4 = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.id.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.unknown4.extractFrom(stream);
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

		json.__fields.id = this.id;
		json.__fields.unknown1 = this.unknown1;
		json.__fields.unknown2 = this.unknown2;
		json.__fields.unknown3 = this.unknown3;
		json.__fields.unknown4 = this.unknown4;

		return json;
	}
}
