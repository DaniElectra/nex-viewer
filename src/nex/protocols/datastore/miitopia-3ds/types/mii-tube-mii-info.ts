import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import DataStoreMetaInfo from '@/nex/protocols/datastore/types/datastore-meta-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MiiTubeMiiInfo';

export default class MiiTubeMiiInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private metaInfo = new DataStoreMetaInfo();
	private category = new UInt8();
	private rankingType = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.metaInfo.extractFrom(stream);
		this.category.extractFrom(stream);
		this.rankingType.extractFrom(stream);
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

		json.__fields.metaInfo = this.metaInfo;
		json.__fields.category = this.category;
		json.__fields.rankingType = this.rankingType;

		return json;
	}
}
