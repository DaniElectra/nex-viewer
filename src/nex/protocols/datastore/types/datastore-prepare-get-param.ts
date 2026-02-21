import * as semver from 'compare-versions';
import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import RVString from '@/nex/types/string';
import DataStorePersistenceTarget from '@/nex/protocols/datastore/types/datastore-persistence-target';
import type NEXByteStream from '@/nex/byte-stream';

export default class DataStorePrepareGetParam extends Structure {
	public readonly typeName = 'DataStorePrepareGetParam';

	private dataID = new UInt64();
	private lockID = new UInt32();
	private persistenceTarget = new DataStorePersistenceTarget();
	private accessPassword = new UInt64();
	private extraData?: List<RVString>; // * NEX v3.5.0

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.lockID.extractFrom(stream);
		this.persistenceTarget.extractFrom(stream);
		this.accessPassword.extractFrom(stream);

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
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {}
		};

		json.__fields.dataID = this.dataID;
		json.__fields.lockID = this.lockID;
		json.__fields.persistenceTarget = this.persistenceTarget;
		json.__fields.accessPassword = this.accessPassword;

		if (this.extraData !== undefined) {
			json.__fields.extraData = this.extraData;
		}

		return json;
	}
}
