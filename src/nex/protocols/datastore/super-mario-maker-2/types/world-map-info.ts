import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import PID from '@/nex/types/pid';
import QBuffer from '@/nex/types/qbuffer';
import UInt8 from '@/nex/types/uint8';
import DateTime from '@/nex/types/datetime';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import RVMap from '@/nex/types/map';
import UInt32 from '@/nex/types/uint32';
import RelationObjectReqGetInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/relation-object-req-get-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'WorldMapInfo';

export default class WorldMapInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private id = new RVString();
	private ownerPID = new PID();
	private unknown1 = new QBuffer();
	private thumbnail = new RelationObjectReqGetInfo();
	private worlds = new UInt8();
	private levels = new UInt8();
	private unknown2 = new UInt8();
	private unknown3 = new DateTime();
	private dataIDs = new List(new UInt64());
	private unknown4 = new RVMap(new UInt8(), new UInt32());
	private unknown5 = new UInt32();
	private unknown6 = new UInt8();
	private unknown7 = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.id.extractFrom(stream);
		this.ownerPID.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.thumbnail.extractFrom(stream);
		this.worlds.extractFrom(stream);
		this.levels.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.dataIDs.extractFrom(stream);
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

		json.__fields.id = this.id;
		json.__fields.ownerPID = this.ownerPID;
		json.__fields.unknown1 = this.unknown1;
		json.__fields.thumbnail = this.thumbnail;
		json.__fields.worlds = this.worlds;
		json.__fields.levels = this.levels;
		json.__fields.unknown2 = this.unknown2;
		json.__fields.unknown3 = this.unknown3;
		json.__fields.dataIDs = this.dataIDs;
		json.__fields.unknown4 = this.unknown4;
		json.__fields.unknown5 = this.unknown5;
		json.__fields.unknown6 = this.unknown6;
		json.__fields.unknown7 = this.unknown7;

		return json;
	}
}
