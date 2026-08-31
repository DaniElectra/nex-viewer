import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import RVBuffer from '@/nex/types/buffer';
import DataStoreKeyValue from '@/nex/protocols/datastore/types/datastore-key-value';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'EventCourseThumbnail';

export default class EventCourseThumbnail extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private url = new RVString();
	private headers = new List(new DataStoreKeyValue());
	private filesize = new UInt32();
	private rootCaCert = new RVBuffer();
	private filename = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.url.extractFrom(stream);
		this.headers.extractFrom(stream);
		this.filesize.extractFrom(stream);
		this.rootCaCert.extractFrom(stream);
		this.filename.extractFrom(stream);
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
		json.__fields.headers = this.headers;
		json.__fields.filesize = this.filesize;
		json.__fields.rootCaCert = this.rootCaCert;
		json.__fields.filename = this.filename;

		return json;
	}
}
