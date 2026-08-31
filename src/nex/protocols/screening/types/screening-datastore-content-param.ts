import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ScreeningDataStoreContentParam';

export default class ScreeningDataStoreContentParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private contentDataId = new UInt64();
	private ugcType = new RVString();
	private language = new RVString();
	private searchKey = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.contentDataId.extractFrom(stream);
		this.ugcType.extractFrom(stream);
		this.language.extractFrom(stream);
		this.searchKey.extractFrom(stream);
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

		json.__fields.dataId = this.dataId;
		json.__fields.contentDataId = this.contentDataId;
		json.__fields.ugcType = this.ugcType;
		json.__fields.language = this.language;
		json.__fields.searchKey = this.searchKey;

		return json;
	}
}
