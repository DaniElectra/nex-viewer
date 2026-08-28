import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import RVString from '@/nex/types/string';
import DataStorePreparePostParam from '@/nex/protocols/datastore/types/datastore-prepare-post-param';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreAttachFileParam';

export default class DataStoreAttachFileParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private postParam = new DataStorePreparePostParam();
	private referDataId = new UInt64();
	private contentType = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.postParam.extractFrom(stream);
		this.referDataId.extractFrom(stream);
		this.contentType.extractFrom(stream);
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

		json.__fields.postParam = this.postParam;
		json.__fields.referDataId = this.referDataId;
		json.__fields.contentType = this.contentType;

		return json;
	}
}
