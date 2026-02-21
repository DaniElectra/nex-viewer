import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import UInt16 from '@/nex/types/uint16';
import QBuffer from '@/nex/types/qbuffer';
import List from '@/nex/types/list';
import UInt8 from '@/nex/types/uint8';
import DataStorePermission from '@/nex/protocols/datastore/types/datastore-permission';
import type NEXByteStream from '@/nex/byte-stream';

export default class DataStoreChangeMetaCompareParam extends Structure {
	public readonly typeName = 'DataStoreChangeMetaCompareParam';

	private comparisonFlag = new UInt32();
	private name = new RVString();
	private permission = new DataStorePermission();
	private delPermission = new DataStorePermission();
	private period = new UInt16();
	private metaBinary = new QBuffer();
	private tags = new List(new RVString());
	private referredCnt = new UInt32();
	private dataType = new UInt16();
	private status = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.comparisonFlag.extractFrom(stream);
		this.name.extractFrom(stream);
		this.permission.extractFrom(stream);
		this.delPermission.extractFrom(stream);
		this.period.extractFrom(stream);
		this.metaBinary.extractFrom(stream);
		this.tags.extractFrom(stream);
		this.referredCnt.extractFrom(stream);
		this.dataType.extractFrom(stream);
		this.status.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {}
		};

		json.__fields.comparisonFlag = this.comparisonFlag;
		json.__fields.name = this.name;
		json.__fields.permission = this.permission;
		json.__fields.delPermission = this.delPermission;
		json.__fields.period = this.period;
		json.__fields.metaBinary = this.metaBinary;
		json.__fields.tags = this.tags;
		json.__fields.referredCnt = this.referredCnt;
		json.__fields.dataType = this.dataType;
		json.__fields.status = this.status;

		return json;
	}
}
