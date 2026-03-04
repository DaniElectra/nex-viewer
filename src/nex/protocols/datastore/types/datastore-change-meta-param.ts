import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import UInt16 from '@/nex/types/uint16';
import QBuffer from '@/nex/types/qbuffer';
import List from '@/nex/types/list';
import UInt8 from '@/nex/types/uint8';
import DataStorePermission from '@/nex/protocols/datastore/types/datastore-permission';
import DataStoreChangeMetaCompareParam from '@/nex/protocols/datastore/types/datastore-change-meta-compare-param';
import DataStorePersistenceTarget from '@/nex/protocols/datastore/types/datastore-persistence-target';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreChangeMetaParam';

export default class DataStoreChangeMetaParam extends Structure {
	public get typeName(): string {
		return className;
	}

	private dataID = new UInt64();
	private modifiesFlag = new UInt32();
	private name = new RVString();
	private permission = new DataStorePermission();
	private delPermission = new DataStorePermission();
	private period = new UInt16();
	private metaBinary = new QBuffer();
	private tags = new List(new RVString());
	private updatePassword = new UInt64();
	private referredCnt = new UInt32();
	private dataType = new UInt16();
	private status = new UInt8();
	private compareParam = new DataStoreChangeMetaCompareParam();
	private persistenceTarget?: DataStorePersistenceTarget; // * Revision 1

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.modifiesFlag.extractFrom(stream);
		this.name.extractFrom(stream);
		this.permission.extractFrom(stream);
		this.delPermission.extractFrom(stream);
		this.period.extractFrom(stream);
		this.metaBinary.extractFrom(stream);
		this.tags.extractFrom(stream);
		this.updatePassword.extractFrom(stream);
		this.referredCnt.extractFrom(stream);
		this.dataType.extractFrom(stream);
		this.status.extractFrom(stream);
		this.compareParam.extractFrom(stream);

		if (this.structureVersion >= 1) {
			this.persistenceTarget = new DataStorePersistenceTarget();
			this.persistenceTarget.extractFrom(stream);
		}
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
		json.__fields.modifiesFlag = this.modifiesFlag;
		json.__fields.name = this.name;
		json.__fields.permission = this.permission;
		json.__fields.delPermission = this.delPermission;
		json.__fields.period = this.period;
		json.__fields.metaBinary = this.metaBinary;
		json.__fields.tags = this.tags;
		json.__fields.updatePassword = this.updatePassword;
		json.__fields.referredCnt = this.referredCnt;
		json.__fields.dataType = this.dataType;
		json.__fields.status = this.status;
		json.__fields.compareParam = this.compareParam;

		if (json.__fields.persistenceTarget !== undefined) {
			json.__fields.persistenceTarget = this.persistenceTarget;
		}

		return json;
	}
}
