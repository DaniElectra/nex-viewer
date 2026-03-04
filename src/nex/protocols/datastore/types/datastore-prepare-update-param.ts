import * as semver from 'compare-versions';
import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStorePrepareUpdateParam';

export default class DataStorePrepareUpdateParam extends Structure {
	public get typeName(): string {
		return className;
	}

	private dataID?: UInt32 | UInt64; // * NEX v2.0.0 vs NEX v3.0.0
	private size = new UInt32();
	private updatePassword?: UInt64; // * NEX v3.0.0
	private extraData?: List<RVString>; // * NEX v3.5.0

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.datastore, '<=2.0.0')) {
			this.dataID = new UInt32();
		} else {
			this.dataID = new UInt64();
		}

		this.dataID.extractFrom(stream);
		this.size.extractFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.datastore, '>=3.0.0')) {
			this.updatePassword = new UInt64();
			this.updatePassword.extractFrom(stream);
		}

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
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.dataID = this.dataID;
		json.__fields.size = this.size;

		if (this.updatePassword !== undefined) {
			json.__fields.updatePassword = this.updatePassword;
		}

		if (this.extraData !== undefined) {
			json.__fields.extraData = this.extraData;
		}

		return json;
	}
}
