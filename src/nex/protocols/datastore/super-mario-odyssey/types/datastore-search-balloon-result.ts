import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import UInt16 from '@/nex/types/uint16';
import QBuffer from '@/nex/types/qbuffer';
import DateTime from '@/nex/types/datetime';
import Bool from '@/nex/types/bool';
import RVMap from '@/nex/types/map';
import Int8 from '@/nex/types/int8';
import DataStoreRatingInfo from '@/nex/protocols/datastore/types/datastore-rating-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreSearchBalloonResult';

export default class DataStoreSearchBalloonResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private ownerId = new PID();
	private size = new UInt32();
	private name = new RVString();
	private dataType = new UInt16();
	private metaBinary = new QBuffer();
	private createdTime = new DateTime();
	private updatedTime = new DateTime();
	private ownerDataId = new UInt64();
	private ownerName = new RVString();
	private isFriendBalloon = new Bool();
	private ratings = new RVMap(new Int8(), new DataStoreRatingInfo());
	private ownerRatings = new RVMap(new Int8(), new DataStoreRatingInfo());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.ownerId.extractFrom(stream);
		this.size.extractFrom(stream);
		this.name.extractFrom(stream);
		this.dataType.extractFrom(stream);
		this.metaBinary.extractFrom(stream);
		this.createdTime.extractFrom(stream);
		this.updatedTime.extractFrom(stream);
		this.ownerDataId.extractFrom(stream);
		this.ownerName.extractFrom(stream);
		this.isFriendBalloon.extractFrom(stream);
		this.ratings.extractFrom(stream);
		this.ownerRatings.extractFrom(stream);
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
		json.__fields.ownerId = this.ownerId;
		json.__fields.size = this.size;
		json.__fields.name = this.name;
		json.__fields.dataType = this.dataType;
		json.__fields.metaBinary = this.metaBinary;
		json.__fields.createdTime = this.createdTime;
		json.__fields.updatedTime = this.updatedTime;
		json.__fields.ownerDataId = this.ownerDataId;
		json.__fields.ownerName = this.ownerName;
		json.__fields.isFriendBalloon = this.isFriendBalloon;
		json.__fields.ratings = this.ratings;
		json.__fields.ownerRatings = this.ownerRatings;

		return json;
	}
}
