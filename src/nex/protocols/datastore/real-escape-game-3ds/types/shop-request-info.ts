import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ShopRequestInfo';

export default class ShopRequestInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private currentId = new UInt32();
	private lastId = new UInt32();
	private total = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.currentId.extractFrom(stream);
		this.lastId.extractFrom(stream);
		this.total.extractFrom(stream);
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

		json.__fields.currentId = this.currentId;
		json.__fields.lastId = this.lastId;
		json.__fields.total = this.total;

		return json;
	}
}
