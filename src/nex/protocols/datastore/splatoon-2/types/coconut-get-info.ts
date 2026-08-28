import DDLClass from '@/nex/types/ddl-class';
import DataStoreReqGetInfo from '@/nex/protocols/datastore/types/datastore-req-get-info';
import CoconutMeta from '@/nex/protocols/datastore/splatoon-2/types/coconut-meta';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CoconutGetInfo';

export default class CoconutGetInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private info = new DataStoreReqGetInfo();
	private meta = new CoconutMeta();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.info.extractFrom(stream);
		this.meta.extractFrom(stream);
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

		json.__fields.info = this.info;
		json.__fields.meta = this.meta;

		return json;
	}
}
