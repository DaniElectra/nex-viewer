import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt16 from '@/nex/types/uint16';
import QBuffer from '@/nex/types/qbuffer';
import DateTime from '@/nex/types/datetime';
import RVMap from '@/nex/types/map';
import Int8 from '@/nex/types/int8';
import List from '@/nex/types/list';
import DataStoreRatingInfo from '@/nex/protocols/datastore/types/datastore-rating-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreFetchMyInfosAchievementResult';

export default class DataStoreFetchMyInfosAchievementResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private dataType = new UInt16();
	private metaBinary = new QBuffer();
	private createdTime = new DateTime();
	private ratings = new RVMap(new Int8(), new DataStoreRatingInfo());
	private buffers = new RVMap(new Int8(), new List(new QBuffer()));

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.dataType.extractFrom(stream);
		this.metaBinary.extractFrom(stream);
		this.createdTime.extractFrom(stream);
		this.ratings.extractFrom(stream);
		this.buffers.extractFrom(stream);
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
		json.__fields.dataType = this.dataType;
		json.__fields.metaBinary = this.metaBinary;
		json.__fields.createdTime = this.createdTime;
		json.__fields.ratings = this.ratings;
		json.__fields.buffers = this.buffers;

		return json;
	}
}
