import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MiiTubeSearchParam';

export default class MiiTubeSearchParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private name = new RVString();
	private page = new UInt32();
	private category = new UInt8();
	private gender = new UInt8();
	private country = new UInt8();
	private searchType = new UInt8();
	private resultOption = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.name.extractFrom(stream);
		this.page.extractFrom(stream);
		this.category.extractFrom(stream);
		this.gender.extractFrom(stream);
		this.country.extractFrom(stream);
		this.searchType.extractFrom(stream);
		this.resultOption.extractFrom(stream);
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

		json.__fields.name = this.name;
		json.__fields.page = this.page;
		json.__fields.category = this.category;
		json.__fields.gender = this.gender;
		json.__fields.country = this.country;
		json.__fields.searchType = this.searchType;
		json.__fields.resultOption = this.resultOption;

		return json;
	}
}
