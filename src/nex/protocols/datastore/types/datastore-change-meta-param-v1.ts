import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import UInt16 from '@/nex/types/uint16';
import QBuffer from '@/nex/types/qbuffer';
import List from '@/nex/types/list';
import DataStorePermission from '@/nex/protocols/datastore/types/datastore-permission';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreChangeMetaParamV1';

export default class DataStoreChangeMetaParamV1 extends DDLClass {
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
		json.__fields.modifiesFlag = this.modifiesFlag;
		json.__fields.name = this.name;
		json.__fields.permission = this.permission;
		json.__fields.delPermission = this.delPermission;
		json.__fields.period = this.period;
		json.__fields.metaBinary = this.metaBinary;
		json.__fields.tags = this.tags;
		json.__fields.updatePassword = this.updatePassword;

		return json;
	}
}
