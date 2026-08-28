import ServiceItemEShopResponse from '@/nex/protocols/service-item/wii-sports-club/types/service-item-eshop-response';
import List from '@/nex/types/list';
import ServiceItemPurchaceInfo from '@/nex/protocols/service-item/wii-sports-club/types/service-item-purchace-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemPurchaseServiceItemResponse';

export default class ServiceItemPurchaseServiceItemResponse extends ServiceItemEShopResponse {
	public get typeName(): string {
		return className;
	}

	private nullablePurchaceInfo = new List(new ServiceItemPurchaceInfo());

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.nullablePurchaceInfo.extractFrom(stream);
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

		json.__fields.nullablePurchaceInfo = this.nullablePurchaceInfo;

		return json;
	}
}
