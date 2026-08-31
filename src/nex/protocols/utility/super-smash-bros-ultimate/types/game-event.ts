import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import UInt16 from '@/nex/types/uint16';
import RVString from '@/nex/types/string';
import DateTime from '@/nex/types/datetime';
import RVMap from '@/nex/types/map';
import Variant from '@/nex/types/variant';
import List from '@/nex/types/list';
import GameEventPeriod from '@/nex/protocols/utility/super-smash-bros-ultimate/types/game-event-period';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GameEvent';

export default class GameEvent extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new UInt32();
	private unknown2 = new UInt32();
	private unknown3 = new UInt16();
	private unknown4 = new RVString();
	private unknown5 = new RVString();
	private unknown6 = new DateTime();
	private unknown7 = new DateTime();
	private unknown8 = new DateTime();
	private unknown9 = new DateTime();
	private unknown10 = new RVMap(new RVString(), new Variant());
	private unknown11 = new RVMap(new RVString(), new List(new Variant()));
	private periods = new List(new GameEventPeriod());

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
		this.periods.extractFrom(stream);
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
		json.__fields.periods = this.periods;

		return json;
	}
}
