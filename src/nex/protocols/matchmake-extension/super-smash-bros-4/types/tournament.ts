import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import UInt16 from '@/nex/types/uint16';
import UInt32 from '@/nex/types/uint32';
import UInt64 from '@/nex/types/uint64';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'Tournament';

export default class Tournament extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new UInt8();
	private unknown2 = new UInt32();
	private unknown3 = new UInt8();
	private unknown4 = new UInt8();
	private unknown5 = new UInt8();
	private unknown6 = new List(new UInt8());
	private unknown7 = new UInt8();
	private unknown8 = new List(new UInt32());
	private unknown9 = new List(new UInt16());
	private unknown10 = new List(new UInt8());
	private unknown11 = new List(new UInt8());
	private unknown12 = new UInt64();
	private unknown13 = new UInt8();
	private unknown14 = new List(new UInt8());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.unknown4.extractFrom(stream);
		this.unknown5.extractFrom(stream);
		this.unknown6.extractFrom(stream);
		this.unknown7.extractFrom(stream);
		this.unknown8.extractFrom(stream);
		this.unknown9.extractFrom(stream);
		this.unknown10.extractFrom(stream);
		this.unknown11.extractFrom(stream);
		this.unknown12.extractFrom(stream);
		this.unknown13.extractFrom(stream);
		this.unknown14.extractFrom(stream);
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
		json.__fields.unknown7 = this.unknown7;
		json.__fields.unknown8 = this.unknown8;
		json.__fields.unknown9 = this.unknown9;
		json.__fields.unknown10 = this.unknown10;
		json.__fields.unknown11 = this.unknown11;
		json.__fields.unknown12 = this.unknown12;
		json.__fields.unknown13 = this.unknown13;
		json.__fields.unknown14 = this.unknown14;

		return json;
	}
}
