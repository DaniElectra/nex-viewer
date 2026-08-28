import DDLClass from '@/nex/types/ddl-class';
import QBuffer from '@/nex/types/qbuffer';
import Int8 from '@/nex/types/int8';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ShopItemRights';

export default class ShopItemRights extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private referenceId = new QBuffer();
	private itemType = new Int8();
	private attribute = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.referenceId.extractFrom(stream);
		this.itemType.extractFrom(stream);
		this.attribute.extractFrom(stream);
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

		json.__fields.referenceId = this.referenceId;
		json.__fields.itemType = this.itemType;
		json.__fields.attribute = this.attribute;

		return json;
	}
}
