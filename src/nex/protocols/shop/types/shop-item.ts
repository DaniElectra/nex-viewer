import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import QBuffer from '@/nex/types/qbuffer';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ShopItem';

export default class ShopItem extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private itemId = new UInt32();
	private referenceId = new QBuffer();
	private serviceName = new RVString();
	private itemCode = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.itemId.extractFrom(stream);
		this.referenceId.extractFrom(stream);
		this.serviceName.extractFrom(stream);
		this.itemCode.extractFrom(stream);
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

		json.__fields.itemId = this.itemId;
		json.__fields.referenceId = this.referenceId;
		json.__fields.serviceName = this.serviceName;
		json.__fields.itemCode = this.itemCode;

		return json;
	}
}
