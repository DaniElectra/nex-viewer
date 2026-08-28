import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import UInt16 from '@/nex/types/uint16';
import QBuffer from '@/nex/types/qbuffer';
import DateTime from '@/nex/types/datetime';
import UInt8 from '@/nex/types/uint8';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'RentalObjectInfo';

export default class RentalObjectInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private unknown1 = new UInt32();
	private unknown2 = new UInt32();
	private unknown3 = new RVString();
	private unknown4 = new UInt16();
	private unknown5 = new QBuffer();
	private unknown6 = new DateTime();
	private unknown7 = new DateTime();
	private unknown8 = new UInt16();
	private unknown9 = new UInt8();
	private unknown10 = new UInt32();
	private unknown11 = new UInt64();
	private unknown12 = new UInt32();
	private unknown13 = new DateTime();
	private unknown14 = new DateTime();
	private unknown15 = new List(new UInt32());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
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
		this.unknown15.extractFrom(stream);
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
		json.__fields.unknown15 = this.unknown15;

		return json;
	}
}
