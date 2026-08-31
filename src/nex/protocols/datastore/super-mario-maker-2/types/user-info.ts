import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import QBuffer from '@/nex/types/qbuffer';
import UInt8 from '@/nex/types/uint8';
import DateTime from '@/nex/types/datetime';
import Bool from '@/nex/types/bool';
import RVMap from '@/nex/types/map';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import UnknownStruct1 from '@/nex/protocols/datastore/super-mario-maker-2/types/unknown-struct-1';
import BadgeInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/badge-info';
import UnknownStruct3 from '@/nex/protocols/datastore/super-mario-maker-2/types/unknown-struct-3';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'UserInfo';

export default class UserInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private userID = new PID();
	private makerCode = new RVString();
	private userName = new RVString();
	private unknown1 = new UnknownStruct1();
	private unknown2 = new QBuffer();
	private countryCode = new RVString();
	private regionID = new UInt8();
	private lastActiveTime = new DateTime();
	private unknown3 = new Bool();
	private unknown4 = new Bool();
	private unknown5 = new Bool();
	private playStats = new RVMap(new UInt8(), new UInt32());
	private makerStats = new RVMap(new UInt8(), new UInt32());
	private endlessModeHighscores = new RVMap(new UInt8(), new UInt32());
	private multiplayerStats = new RVMap(new UInt8(), new UInt32());
	private unknown6 = new RVMap(new UInt8(), new UInt32());
	private badgeInfo = new List(new BadgeInfo());
	private unknown7 = new RVMap(new UInt8(), new UInt32());
	private unknown8 = new RVMap(new UInt8(), new UInt32());
	private unknown9?: Bool; // * Revision 1
	private unknown10?: DateTime; // * Revision 1
	private unknown11?: Bool; // * Revision 1
	private unknown12?: UnknownStruct3; // * Revision 2
	private unknown13?: RVString; // * Revision 3
	private unknown14?: RVMap<UInt8, UInt32>; // * Revision 3
	private unknown15?: Bool; // * Revision 3

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.userID.extractFrom(stream);
		this.makerCode.extractFrom(stream);
		this.userName.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.countryCode.extractFrom(stream);
		this.regionID.extractFrom(stream);
		this.lastActiveTime.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.unknown4.extractFrom(stream);
		this.unknown5.extractFrom(stream);
		this.playStats.extractFrom(stream);
		this.makerStats.extractFrom(stream);
		this.endlessModeHighscores.extractFrom(stream);
		this.multiplayerStats.extractFrom(stream);
		this.unknown6.extractFrom(stream);
		this.badgeInfo.extractFrom(stream);
		this.unknown7.extractFrom(stream);
		this.unknown8.extractFrom(stream);

		if (this.revision >= 1) {
			this.unknown9 = new Bool();
			this.unknown9.extractFrom(stream);

			this.unknown10 = new DateTime();
			this.unknown10.extractFrom(stream);

			this.unknown11 = new Bool();
			this.unknown11.extractFrom(stream);
		}

		if (this.revision >= 2) {
			this.unknown12 = new UnknownStruct3();
			this.unknown12.extractFrom(stream);
		}

		if (this.revision >= 3) {
			this.unknown13 = new RVString();
			this.unknown13.extractFrom(stream);

			this.unknown14 = new RVMap(new UInt8(), new UInt32());
			this.unknown14.extractFrom(stream);

			this.unknown15 = new Bool();
			this.unknown15.extractFrom(stream);
		}
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

		json.__fields.userID = this.userID;
		json.__fields.makerCode = this.makerCode;
		json.__fields.userName = this.userName;
		json.__fields.unknown1 = this.unknown1;
		json.__fields.unknown2 = this.unknown2;
		json.__fields.countryCode = this.countryCode;
		json.__fields.regionID = this.regionID;
		json.__fields.lastActiveTime = this.lastActiveTime;
		json.__fields.unknown3 = this.unknown3;
		json.__fields.unknown4 = this.unknown4;
		json.__fields.unknown5 = this.unknown5;
		json.__fields.playStats = this.playStats;
		json.__fields.makerStats = this.makerStats;
		json.__fields.endlessModeHighscores = this.endlessModeHighscores;
		json.__fields.multiplayerStats = this.multiplayerStats;
		json.__fields.unknown6 = this.unknown6;
		json.__fields.badgeInfo = this.badgeInfo;
		json.__fields.unknown7 = this.unknown7;
		json.__fields.unknown8 = this.unknown8;

		if (this.unknown9 !== undefined) {
			json.__fields.unknown9 = this.unknown9;
		}

		if (this.unknown10 !== undefined) {
			json.__fields.unknown10 = this.unknown10;
		}

		if (this.unknown11 !== undefined) {
			json.__fields.unknown11 = this.unknown11;
		}

		if (this.unknown12 !== undefined) {
			json.__fields.unknown12 = this.unknown12;
		}

		if (this.unknown13 !== undefined) {
			json.__fields.unknown13 = this.unknown13;
		}

		if (this.unknown14 !== undefined) {
			json.__fields.unknown14 = this.unknown14;
		}

		if (this.unknown15 !== undefined) {
			json.__fields.unknown15 = this.unknown15;
		}

		return json;
	}
}
