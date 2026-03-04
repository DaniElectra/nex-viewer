import * as semver from 'compare-versions';
import DDLClass from '@/nex/types/ddl-class';
import UInt16 from '@/nex/types/uint16';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import RVBuffer from '@/nex/types/buffer';
import DataStoreKeyValue from '@/nex/protocols/datastore/types/datastore-key-value';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreReqUpdateInfo';

export default class DataStoreReqUpdateInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private version?: UInt16 | UInt32; // * NEX v2.0.0 vs NEX v3.0.0
	private uRL = new RVString();
	private requestHeaders = new List(new DataStoreKeyValue());
	private formFields = new List(new DataStoreKeyValue());
	private rootCACert = new RVBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.datastore, '<=2.0.0')) {
			this.version = new UInt16();
		} else {
			this.version = new UInt32();
		}

		this.version.extractFrom(stream);
		this.uRL.extractFrom(stream);
		this.requestHeaders.extractFrom(stream);
		this.formFields.extractFrom(stream);
		this.rootCACert.extractFrom(stream);
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

		json.__fields.version = this.version;
		json.__fields.uRL = this.uRL;
		json.__fields.requestHeaders = this.requestHeaders;
		json.__fields.formFields = this.formFields;
		json.__fields.rootCACert = this.rootCACert;

		return json;
	}
}
