import ServiceItemEShopResponse from '@/nex/protocols/service-item/wii-sports-club/types/service-item-eshop-response';
import List from '@/nex/types/list';
import ServiceItemPurchaseHistory from '@/nex/protocols/service-item/wii-sports-club/types/service-item-purchase-history';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemGetPurchaseHistoryResponse';

export default class ServiceItemGetPurchaseHistoryResponse extends ServiceItemEShopResponse {
	public get typeName(): string {
		return className;
	}

	private nullablePurchaseHistory = new List(new ServiceItemPurchaseHistory());

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.nullablePurchaseHistory.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__parent: super.toJSON(),
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.nullablePurchaseHistory = this.nullablePurchaseHistory;

		return json;
	}
}
