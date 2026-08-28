import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import RVBuffer from '@/nex/types/buffer';
import DataStoreKeyValue from '@/nex/protocols/datastore/types/datastore-key-value';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'RelationObjectReqPostInfo';

export default class RelationObjectReqPostInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataID = new RVString();
	private url = new RVString();
	private headers = new List(new DataStoreKeyValue());
	private formFields = new List(new DataStoreKeyValue());
	private rootCaCert = new RVBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.url.extractFrom(stream);
		this.headers.extractFrom(stream);
		this.formFields.extractFrom(stream);
		this.rootCaCert.extractFrom(stream);
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
		json.__fields.url = this.url;
		json.__fields.headers = this.headers;
		json.__fields.formFields = this.formFields;
		json.__fields.rootCaCert = this.rootCaCert;

		return json;
	}
}
