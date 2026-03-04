import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import UInt8 from '@/nex/types/uint8';
import DataStoreMetaInfo from '@/nex/protocols/datastore/types/datastore-meta-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreSearchResult';

export default class DataStoreSearchResult extends Structure {
	public get typeName(): string {
		return className;
	}

	private totalCount = new UInt32();
	private result = new List(new DataStoreMetaInfo());
	private totalCountType = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.totalCount.extractFrom(stream);
		this.result.extractFrom(stream);
		this.totalCountType.extractFrom(stream);
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

		json.__fields.totalCount = this.totalCount;
		json.__fields.result = this.result;
		json.__fields.totalCountType = this.totalCountType;

		return json;
	}
}
