import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
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
	private titleId = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.itemCode.extractFrom(stream);
		this.priceId.extractFrom(stream);
		this.referenceId.extractFrom(stream);
		this.balance.extractFrom(stream);
		this.itemName.extractFrom(stream);
		this.ecServiceToken.extractFrom(stream);
		this.language.extractFrom(stream);
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

		json.__fields.itemCode = this.itemCode;
		json.__fields.priceId = this.priceId;
		json.__fields.referenceId = this.referenceId;
		json.__fields.balance = this.balance;
		json.__fields.itemName = this.itemName;
		json.__fields.ecServiceToken = this.ecServiceToken;
		json.__fields.language = this.language;
		json.__fields.titleId = this.titleId;

		return json;
	}
}
