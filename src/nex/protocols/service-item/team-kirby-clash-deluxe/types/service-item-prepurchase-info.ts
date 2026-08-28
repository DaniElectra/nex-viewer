import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import ServiceItemAmount from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-amount';
import Bool from '@/nex/types/bool';
import ServiceItemPrepurchaseRightInfo from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-prepurchase-right-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemPrepurchaseInfo';

export default class ServiceItemPrepurchaseInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private itemCode = new RVString();
	private priceId = new RVString();
	private regularPrice = new ServiceItemAmount();
	private isTaxAvailable = new Bool();
	private taxAmount = new ServiceItemAmount();
	private totalAmount = new ServiceItemAmount();
	private currentBalance = new ServiceItemAmount();
	private postBalance = new ServiceItemAmount();
	private currentRightInfo = new ServiceItemPrepurchaseRightInfo();
	private postRightInfo = new ServiceItemPrepurchaseRightInfo();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.itemCode.extractFrom(stream);
		this.priceId.extractFrom(stream);
		this.regularPrice.extractFrom(stream);
		this.isTaxAvailable.extractFrom(stream);
		this.taxAmount.extractFrom(stream);
		this.totalAmount.extractFrom(stream);
		this.currentBalance.extractFrom(stream);
		this.postBalance.extractFrom(stream);
		this.currentRightInfo.extractFrom(stream);
		this.postRightInfo.extractFrom(stream);
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
		json.__fields.regularPrice = this.regularPrice;
		json.__fields.isTaxAvailable = this.isTaxAvailable;
		json.__fields.taxAmount = this.taxAmount;
		json.__fields.totalAmount = this.totalAmount;
		json.__fields.currentBalance = this.currentBalance;
		json.__fields.postBalance = this.postBalance;
		json.__fields.currentRightInfo = this.currentRightInfo;
		json.__fields.postRightInfo = this.postRightInfo;

		return json;
	}
}
