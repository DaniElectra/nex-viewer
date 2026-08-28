import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import ServiceItemAmount from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-amount';
import Bool from '@/nex/types/bool';
import ServiceItemLimitation from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-limitation';
import List from '@/nex/types/list';
import ServiceItemAttribute from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-attribute';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemListItem';

export default class ServiceItemListItem extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private itemCode = new RVString();
	private regularPrice = new ServiceItemAmount();
	private taxExcluded = new Bool();
	private initialPurchaseOnly = new Bool();
	private limitation = new ServiceItemLimitation();
	private attributes = new List(new ServiceItemAttribute());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.itemCode.extractFrom(stream);
		this.regularPrice.extractFrom(stream);
		this.taxExcluded.extractFrom(stream);
		this.initialPurchaseOnly.extractFrom(stream);
		this.limitation.extractFrom(stream);
		this.attributes.extractFrom(stream);
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
		json.__fields.regularPrice = this.regularPrice;
		json.__fields.taxExcluded = this.taxExcluded;
		json.__fields.initialPurchaseOnly = this.initialPurchaseOnly;
		json.__fields.limitation = this.limitation;
		json.__fields.attributes = this.attributes;

		return json;
	}
}
