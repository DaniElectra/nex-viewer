import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import DataStoreKeyValue from '@/nex/protocols/datastore/types/datastore-key-value';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ReqGetInfoHeadersInfo';

export default class ReqGetInfoHeadersInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private headers = new List(new DataStoreKeyValue());
	private expiration = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.headers.extractFrom(stream);
		this.expiration.extractFrom(stream);
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

		json.__fields.headers = this.headers;
		json.__fields.expiration = this.expiration;

		return json;
	}
}
