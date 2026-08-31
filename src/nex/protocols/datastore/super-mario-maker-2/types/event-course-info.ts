import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import RVString from '@/nex/types/string';
import UInt8 from '@/nex/types/uint8';
import Bool from '@/nex/types/bool';
import DateTime from '@/nex/types/datetime';
import RVMap from '@/nex/types/map';
import UInt32 from '@/nex/types/uint32';
import UInt16 from '@/nex/types/uint16';
import DataStoreReqGetInfo from '@/nex/protocols/datastore/types/datastore-req-get-info';
import UnknownStruct6 from '@/nex/protocols/datastore/super-mario-maker-2/types/unknown-struct-6';
import EventCourseThumbnail from '@/nex/protocols/datastore/super-mario-maker-2/types/event-course-thumbnail';
import RelationObjectReqGetInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/relation-object-req-get-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'EventCourseInfo';

export default class EventCourseInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataID = new UInt64();
	private name = new RVString();
	private description = new RVString();
	private gameStyle = new UInt8();
	private courseTheme = new UInt8();
	private unknown1 = new Bool();
	private unknown2 = new Bool();
	private uploadTime = new DateTime();
	private getRequestInfo = new DataStoreReqGetInfo();
	private unknown3 = new RVMap(new UInt8(), new UInt32());
	private unknown4 = new UnknownStruct6();
	private unknown5 = new UInt8();
	private oneScreenThumbnail = new EventCourseThumbnail();
	private entireThumbnail = new EventCourseThumbnail();
	private deadline?: DateTime; // * Revision 1
	private unknown6?: UInt8; // * Revision 1
	private unknown7?: UInt32; // * Revision 1
	private unknown8?: UInt16; // * Revision 1
	private unknown9?: UInt16; // * Revision 1
	private personalBestTime?: UInt32; // * Revision 1
	private unknown10?: UInt32; // * Revision 1
	private timeRequiredForMedal?: UInt32; // * Revision 1
	private personalBestTimeGhost?: RelationObjectReqGetInfo; // * Revision 1

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.name.extractFrom(stream);
		this.description.extractFrom(stream);
		this.gameStyle.extractFrom(stream);
		this.courseTheme.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.uploadTime.extractFrom(stream);
		this.getRequestInfo.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.unknown4.extractFrom(stream);
		this.unknown5.extractFrom(stream);
		this.oneScreenThumbnail.extractFrom(stream);
		this.entireThumbnail.extractFrom(stream);

		if (this.revision >= 1) {
			this.deadline = new DateTime();
			this.deadline.extractFrom(stream);

			this.unknown6 = new UInt8();
			this.unknown6.extractFrom(stream);

			this.unknown7 = new UInt32();
			this.unknown7.extractFrom(stream);

			this.unknown8 = new UInt16();
			this.unknown8.extractFrom(stream);

			this.unknown9 = new UInt16();
			this.unknown9.extractFrom(stream);

			this.personalBestTime = new UInt32();
			this.personalBestTime.extractFrom(stream);

			this.unknown10 = new UInt32();
			this.unknown10.extractFrom(stream);

			this.timeRequiredForMedal = new UInt32();
			this.timeRequiredForMedal.extractFrom(stream);

			this.personalBestTimeGhost = new RelationObjectReqGetInfo();
			this.personalBestTimeGhost.extractFrom(stream);
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

		json.__fields.dataID = this.dataID;
		json.__fields.name = this.name;
		json.__fields.description = this.description;
		json.__fields.gameStyle = this.gameStyle;
		json.__fields.courseTheme = this.courseTheme;
		json.__fields.unknown1 = this.unknown1;
		json.__fields.unknown2 = this.unknown2;
		json.__fields.uploadTime = this.uploadTime;
		json.__fields.getRequestInfo = this.getRequestInfo;
		json.__fields.unknown3 = this.unknown3;
		json.__fields.unknown4 = this.unknown4;
		json.__fields.unknown5 = this.unknown5;
		json.__fields.oneScreenThumbnail = this.oneScreenThumbnail;
		json.__fields.entireThumbnail = this.entireThumbnail;

		if (this.deadline !== undefined) {
			json.__fields.deadline = this.deadline;
		}

		if (this.unknown6 !== undefined) {
			json.__fields.unknown6 = this.unknown6;
		}

		if (this.unknown7 !== undefined) {
			json.__fields.unknown7 = this.unknown7;
		}

		if (this.unknown8 !== undefined) {
			json.__fields.unknown8 = this.unknown8;
		}

		if (this.unknown9 !== undefined) {
			json.__fields.unknown9 = this.unknown9;
		}

		if (this.personalBestTime !== undefined) {
			json.__fields.personalBestTime = this.personalBestTime;
		}

		if (this.unknown10 !== undefined) {
			json.__fields.unknown10 = this.unknown10;
		}

		if (this.timeRequiredForMedal !== undefined) {
			json.__fields.timeRequiredForMedal = this.timeRequiredForMedal;
		}

		if (this.personalBestTimeGhost !== undefined) {
			json.__fields.personalBestTimeGhost = this.personalBestTimeGhost;
		}

		return json;
	}
}
