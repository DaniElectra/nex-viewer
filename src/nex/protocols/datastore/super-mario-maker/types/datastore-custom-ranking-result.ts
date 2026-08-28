import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import DataStoreMetaInfo from '@/nex/protocols/datastore/types/datastore-meta-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreCustomRankingResult';

export default class DataStoreCustomRankingResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private order = new UInt32();
	private score = new UInt32();
	private metaInfo = new DataStoreMetaInfo();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.order.extractFrom(stream);
		this.score.extractFrom(stream);
		this.metaInfo.extractFrom(stream);
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

		json.__fields.order = this.order;
		json.__fields.score = this.score;
		json.__fields.metaInfo = this.metaInfo;

		return json;
	}
}
