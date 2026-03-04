import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import RVBuffer from '@/nex/types/buffer';
import DataStoreKeyValue from '@/nex/protocols/datastore/types/datastore-key-value';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreReqPostInfo';

export default class DataStoreReqPostInfo extends Structure {
	public get typeName(): string {
		return className;
	}

	private dataID = new UInt64();
	private uRL = new RVString();
	private requestHeaders = new List(new DataStoreKeyValue());
	private formFields = new List(new DataStoreKeyValue());
	private rootCACert = new RVBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
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
			__version: this.structureVersion,
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.dataID = this.dataID;
		json.__fields.uRL = this.uRL;
		json.__fields.requestHeaders = this.requestHeaders;
		json.__fields.formFields = this.formFields;
		json.__fields.rootCACert = this.rootCACert;

		return json;
	}
}
