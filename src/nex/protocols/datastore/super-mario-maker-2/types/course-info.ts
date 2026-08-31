import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import RVString from '@/nex/types/string';
import PID from '@/nex/types/pid';
import UInt8 from '@/nex/types/uint8';
import DateTime from '@/nex/types/datetime';
import UInt32 from '@/nex/types/uint32';
import UInt16 from '@/nex/types/uint16';
import QBuffer from '@/nex/types/qbuffer';
import RVMap from '@/nex/types/map';
import CourseTimeStats from '@/nex/protocols/datastore/super-mario-maker-2/types/course-time-stats';
import RelationObjectReqGetInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/relation-object-req-get-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CourseInfo';

export default class CourseInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataID = new UInt64();
	private levelCode = new RVString();
	private ownerID = new PID();
	private levelName = new RVString();
	private description = new RVString();
	private gameStyle = new UInt8();
	private courseTheme = new UInt8();
	private uploadTime = new DateTime();
	private difficulty = new UInt8();
	private firstTag = new UInt8();
	private secondTag = new UInt8();
	private unknown1 = new UInt8();
	private clearCondition = new UInt32();
	private clearConditionMagnitude = new UInt16();
	private unknown2 = new UInt16();
	private unknown3 = new QBuffer();
	private playStats = new RVMap(new UInt8(), new UInt32());
	private courseRatings = new RVMap(new UInt8(), new UInt32());
	private unknown4 = new RVMap(new UInt8(), new UInt32());
	private timeStats = new CourseTimeStats();
	private commentStats = new RVMap(new UInt8(), new UInt32());
	private unknown5 = new UInt8();
	private unknown6 = new UInt8();
	private unknown7 = new UInt8();
	private unknown8 = new UInt8();
	private oneScreenThumbnail = new RelationObjectReqGetInfo();
	private entireThumbnail = new RelationObjectReqGetInfo();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.levelCode.extractFrom(stream);
		this.ownerID.extractFrom(stream);
		this.levelName.extractFrom(stream);
		this.description.extractFrom(stream);
		this.gameStyle.extractFrom(stream);
		this.courseTheme.extractFrom(stream);
		this.uploadTime.extractFrom(stream);
		this.difficulty.extractFrom(stream);
		this.firstTag.extractFrom(stream);
		this.secondTag.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.clearCondition.extractFrom(stream);
		this.clearConditionMagnitude.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.playStats.extractFrom(stream);
		this.courseRatings.extractFrom(stream);
		this.unknown4.extractFrom(stream);
		this.timeStats.extractFrom(stream);
		this.commentStats.extractFrom(stream);
		this.unknown5.extractFrom(stream);
		this.unknown6.extractFrom(stream);
		this.unknown7.extractFrom(stream);
		this.unknown8.extractFrom(stream);
		this.oneScreenThumbnail.extractFrom(stream);
		this.entireThumbnail.extractFrom(stream);
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
		json.__fields.levelCode = this.levelCode;
		json.__fields.ownerID = this.ownerID;
		json.__fields.levelName = this.levelName;
		json.__fields.description = this.description;
		json.__fields.gameStyle = this.gameStyle;
		json.__fields.courseTheme = this.courseTheme;
		json.__fields.uploadTime = this.uploadTime;
		json.__fields.difficulty = this.difficulty;
		json.__fields.firstTag = this.firstTag;
		json.__fields.secondTag = this.secondTag;
		json.__fields.unknown1 = this.unknown1;
		json.__fields.clearCondition = this.clearCondition;
		json.__fields.clearConditionMagnitude = this.clearConditionMagnitude;
		json.__fields.unknown2 = this.unknown2;
		json.__fields.unknown3 = this.unknown3;
		json.__fields.playStats = this.playStats;
		json.__fields.courseRatings = this.courseRatings;
		json.__fields.unknown4 = this.unknown4;
		json.__fields.timeStats = this.timeStats;
		json.__fields.commentStats = this.commentStats;
		json.__fields.unknown5 = this.unknown5;
		json.__fields.unknown6 = this.unknown6;
		json.__fields.unknown7 = this.unknown7;
		json.__fields.unknown8 = this.unknown8;
		json.__fields.oneScreenThumbnail = this.oneScreenThumbnail;
		json.__fields.entireThumbnail = this.entireThumbnail;

		return json;
	}
}
