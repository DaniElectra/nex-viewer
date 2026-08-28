import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemPurchaseServiceItemParam';

export default class ServiceItemPurchaseServiceItemParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private itemCode = new RVString();
	private priceId = new RVString();
	private referenceId = new RVString();
	private balance = new RVString();
	private itemName = new RVString();
	private ecServiceToken = new RVString();
	private language = new RVString();
	private uniqueId = new UInt32();
	private platform?: UInt8; // * Revision 1

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.itemCode.extractFrom(stream);
		this.priceId.extractFrom(stream);
		this.referenceId.extractFrom(stream);
		this.balance.extractFrom(stream);
		this.itemName.extractFrom(stream);
		this.ecServiceToken.extractFrom(stream);
		this.language.extractFrom(stream);
		this.uniqueId.extractFrom(stream);

		if (this.revision >= 1) {
			this.platform = new UInt8();
			this.platform.extractFrom(stream);
		}
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

		json.__fields.itemCode = this.itemCode;
		json.__fields.priceId = this.priceId;
		json.__fields.referenceId = this.referenceId;
		json.__fields.balance = this.balance;
		json.__fields.itemName = this.itemName;
		json.__fields.ecServiceToken = this.ecServiceToken;
		json.__fields.language = this.language;
		json.__fields.uniqueId = this.uniqueId;

		if (this.platform !== undefined) {
			json.__fields.platform = this.platform;
		}

		return json;
	}
}
