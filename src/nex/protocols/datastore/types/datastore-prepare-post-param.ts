import * as semver from 'compare-versions';
import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import UInt16 from '@/nex/types/uint16';
import QBuffer from '@/nex/types/qbuffer';
import List from '@/nex/types/list';
import DataStorePermission from '@/nex/protocols/datastore/types/datastore-permission';
import DataStoreRatingInitParamWithSlot from '@/nex/protocols/datastore/types/datastore-rating-init-param-with-slot';
import DataStorePersistenceInitParam from '@/nex/protocols/datastore/types/datastore-persistence-init-param';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStorePreparePostParam';

export default class DataStorePreparePostParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private size = new UInt32();
	private name = new RVString();
	private dataType = new UInt16();
	private metaBinary = new QBuffer();
	private permission = new DataStorePermission();
	private delPermission = new DataStorePermission();
	private flag = new UInt32();
	private period = new UInt16();
	private referDataID = new UInt32();
	private tags = new List(new RVString());
	private ratingInitParams = new List(new DataStoreRatingInitParamWithSlot());
	private persistenceInitParam = new DataStorePersistenceInitParam();
	private extraData?: List<RVString>; // * NEX v3.5.0

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.size.extractFrom(stream);
		this.name.extractFrom(stream);
		this.dataType.extractFrom(stream);
		this.metaBinary.extractFrom(stream);
		this.permission.extractFrom(stream);
		this.delPermission.extractFrom(stream);
		this.flag.extractFrom(stream);
		this.period.extractFrom(stream);
		this.referDataID.extractFrom(stream);
		this.tags.extractFrom(stream);
		this.ratingInitParams.extractFrom(stream);
		this.persistenceInitParam.extractFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.datastore, '>=3.5.0')) {
			this.extraData = new List(new RVString());
			this.extraData.extractFrom(stream);
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

		json.__fields.size = this.size;
		json.__fields.name = this.name;
		json.__fields.dataType = this.dataType;
		json.__fields.metaBinary = this.metaBinary;
		json.__fields.permission = this.permission;
		json.__fields.delPermission = this.delPermission;
		json.__fields.flag = this.flag;
		json.__fields.period = this.period;
		json.__fields.referDataID = this.referDataID;
		json.__fields.tags = this.tags;
		json.__fields.ratingInitParams = this.ratingInitParams;
		json.__fields.persistenceInitParam = this.persistenceInitParam;

		if (this.extraData !== undefined) {
			json.__fields.extraData = this.extraData;
		}

		return json;
	}
}
