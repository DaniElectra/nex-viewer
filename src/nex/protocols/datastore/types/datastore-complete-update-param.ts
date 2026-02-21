import * as semver from 'compare-versions';
import Structure from '@/nex/types/structure';
import UInt16 from '@/nex/types/uint16';
import UInt32 from '@/nex/types/uint32';
import UInt64 from '@/nex/types/uint64';
import Bool from '@/nex/types/bool';
import type NEXByteStream from '@/nex/byte-stream';

export default class DataStoreCompleteUpdateParam extends Structure {
	public readonly typeName = 'DataStoreCompleteUpdateParam';

	private dataID?: UInt32 | UInt64; // * NEX v2.0.0 vs NEX v3.0.0
	private version?: UInt16 | UInt32; // * NEX v2.0.0 vs NEX v3.0.0
	private isSuccess = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.datastore, '<=2.0.0')) {
			this.dataID = new UInt32();
			this.version = new UInt16();
		} else {
			this.dataID = new UInt64();
			this.version = new UInt32();
		}

		this.dataID.extractFrom(stream);
		this.version.extractFrom(stream);
		this.isSuccess.extractFrom(stream);
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
		json.__fields.version = this.version;
		json.__fields.isSuccess = this.isSuccess;

		return json;
	}
}
