import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemGetPurchaseHistoryParam';

export default class ServiceItemGetPurchaseHistoryParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private language = new RVString();
	private offset = new UInt32();
	private size = new UInt32();
	private titleId = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.language.extractFrom(stream);
		this.offset.extractFrom(stream);
		this.size.extractFrom(stream);
		this.titleId.extractFrom(stream);
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

		json.__fields.language = this.language;
		json.__fields.offset = this.offset;
		json.__fields.size = this.size;
		json.__fields.titleId = this.titleId;

		return json;
	}
}
