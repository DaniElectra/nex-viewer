import * as semver from 'compare-versions';
import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import RVBuffer from '@/nex/types/buffer';
import UInt64 from '@/nex/types/uint64';
import DataStoreKeyValue from '@/nex/protocols/datastore/types/datastore-key-value';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreReqGetInfo';

export default class DataStoreReqGetInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private url = new RVString();
	private requestHeaders = new List(new DataStoreKeyValue());
	private size = new UInt32();
	private rootCACert = new RVBuffer();
	private dataID?: UInt64; // * NEX v3.5.0

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.url.extractFrom(stream);
		this.requestHeaders.extractFrom(stream);
		this.size.extractFrom(stream);
		this.rootCACert.extractFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.datastore, '>=3.5.0')) {
			this.dataID = new UInt64();
			this.dataID.extractFrom(stream);
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

		json.__fields.url = this.url;
		json.__fields.requestHeaders = this.requestHeaders;
		json.__fields.size = this.size;
		json.__fields.rootCACert = this.rootCACert;

		if (this.dataID !== undefined) {
			json.__fields.dataID = this.dataID;
		}

		return json;
	}
}
