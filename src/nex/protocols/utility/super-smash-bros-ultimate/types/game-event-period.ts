import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import DateTime from '@/nex/types/datetime';
import RVMap from '@/nex/types/map';
import RVString from '@/nex/types/string';
import Variant from '@/nex/types/variant';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GameEventPeriod';

export default class GameEventPeriod extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new UInt32();
	private unknown2 = new UInt32();
	private unknown3 = new DateTime();
	private unknown4 = new DateTime();
	private unknown5 = new RVMap(new RVString(), new Variant());
	private unknown6 = new RVMap(new RVString(), new List(new Variant()));
	private unknown7 = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.unknown4.extractFrom(stream);
		this.unknown5.extractFrom(stream);
		this.unknown6.extractFrom(stream);
		this.unknown7.extractFrom(stream);
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

		return json;
	}
}
