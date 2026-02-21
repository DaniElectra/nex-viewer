import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import UInt8 from '@/nex/types/uint8';
import DataStorePersistenceTarget from '@/nex/protocols/datastore/types/datastore-persistence-target';
import type NEXByteStream from '@/nex/byte-stream';

export default class DataStoreGetMetaParam extends Structure {
	public readonly typeName = 'DataStoreGetMetaParam';

	private dataID = new UInt64();
	private persistenceTarget = new DataStorePersistenceTarget();
	private resultOption = new UInt8();
	private accessPassword = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.persistenceTarget.extractFrom(stream);
		this.resultOption.extractFrom(stream);
		this.accessPassword.extractFrom(stream);
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
		json.__fields.persistenceTarget = this.persistenceTarget;
		json.__fields.resultOption = this.resultOption;
		json.__fields.accessPassword = this.accessPassword;

		return json;
	}
}
