import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import PID from '@/nex/types/pid';
import UInt8 from '@/nex/types/uint8';
import RVString from '@/nex/types/string';
import QBuffer from '@/nex/types/qbuffer';
import Int64 from '@/nex/types/int64';
import DateTime from '@/nex/types/datetime';
import DataStoreFileServerObjectInfo from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-file-server-object-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreSharedDataInfo';

export default class DataStoreSharedDataInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private ownerId = new PID();
	private dataType = new UInt8();
	private comment = new RVString();
	private metaBinary = new QBuffer();
	private profile = new QBuffer();
	private rating = new Int64();
	private createdTime = new DateTime();
	private info = new DataStoreFileServerObjectInfo();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.ownerId.extractFrom(stream);
		this.dataType.extractFrom(stream);
		this.comment.extractFrom(stream);
		this.metaBinary.extractFrom(stream);
		this.profile.extractFrom(stream);
		this.rating.extractFrom(stream);
		this.createdTime.extractFrom(stream);
		this.info.extractFrom(stream);
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
		json.__fields.dataType = this.dataType;
		json.__fields.comment = this.comment;
		json.__fields.metaBinary = this.metaBinary;
		json.__fields.profile = this.profile;
		json.__fields.rating = this.rating;
		json.__fields.createdTime = this.createdTime;
		json.__fields.info = this.info;

		return json;
	}
}
