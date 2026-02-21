import Structure from '@/nex/types/structure';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import RVBuffer from '@/nex/types/buffer';
import DataStoreKeyValue from '@/nex/protocols/datastore/types/datastore-key-value';
import type NEXByteStream from '@/nex/byte-stream';

export default class DataStoreReqGetInfoV1 extends Structure {
	public readonly typeName = 'DataStoreReqGetInfoV1';

	private url = new RVString();
	private requestHeaders = new List(new DataStoreKeyValue());
	private size = new UInt32();
	private rootCACert = new RVBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.url.extractFrom(stream);
		this.requestHeaders.extractFrom(stream);
		this.size.extractFrom(stream);
		this.rootCACert.extractFrom(stream);
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

		json.__fields.url = this.url;
		json.__fields.requestHeaders = this.requestHeaders;
		json.__fields.size = this.size;
		json.__fields.rootCACert = this.rootCACert;

		return json;
	}
}
