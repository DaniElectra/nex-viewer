import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import UInt16 from '@/nex/types/uint16';
import QBuffer from '@/nex/types/qbuffer';
import DateTime from '@/nex/types/datetime';
import UInt8 from '@/nex/types/uint8';
import List from '@/nex/types/list';
import DataStorePermission from '@/nex/protocols/datastore/types/datastore-permission';
import DataStoreRatingInfoWithSlot from '@/nex/protocols/datastore/types/datastore-rating-info-with-slot';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreMetaInfo';

export default class DataStoreMetaInfo extends Structure {
	public get typeName(): string {
		return className;
	}

	private dataID = new UInt64();
	private ownerID = new PID();
	private size = new UInt32();
	private name = new RVString();
	private dataType = new UInt16();
	private metaBinary = new QBuffer();
	private permission = new DataStorePermission();
	private delPermission = new DataStorePermission();
	private createdTime = new DateTime();
	private updatedTime = new DateTime();
	private period = new UInt16();
	private status = new UInt8();
	private referredCnt = new UInt32();
	private referDataID = new UInt32();
	private flag = new UInt32();
	private referredTime = new DateTime();
	private expireTime = new DateTime();
	private tags = new List(new RVString());
	private ratings = new List(new DataStoreRatingInfoWithSlot());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.ownerID.extractFrom(stream);
		this.size.extractFrom(stream);
		this.name.extractFrom(stream);
		this.dataType.extractFrom(stream);
		this.metaBinary.extractFrom(stream);
		this.permission.extractFrom(stream);
		this.delPermission.extractFrom(stream);
		this.createdTime.extractFrom(stream);
		this.updatedTime.extractFrom(stream);
		this.period.extractFrom(stream);
		this.status.extractFrom(stream);
		this.referredCnt.extractFrom(stream);
		this.referDataID.extractFrom(stream);
		this.flag.extractFrom(stream);
		this.referredTime.extractFrom(stream);
		this.expireTime.extractFrom(stream);
		this.tags.extractFrom(stream);
		this.ratings.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.dataID = this.dataID;
		json.__fields.ownerID = this.ownerID;
		json.__fields.size = this.size;
		json.__fields.name = this.name;
		json.__fields.dataType = this.dataType;
		json.__fields.metaBinary = this.metaBinary;
		json.__fields.permission = this.permission;
		json.__fields.delPermission = this.delPermission;
		json.__fields.createdTime = this.createdTime;
		json.__fields.updatedTime = this.updatedTime;
		json.__fields.period = this.period;
		json.__fields.status = this.status;
		json.__fields.referredCnt = this.referredCnt;
		json.__fields.referDataID = this.referDataID;
		json.__fields.flag = this.flag;
		json.__fields.referredTime = this.referredTime;
		json.__fields.expireTime = this.expireTime;
		json.__fields.tags = this.tags;
		json.__fields.ratings = this.ratings;

		return json;
	}
}
