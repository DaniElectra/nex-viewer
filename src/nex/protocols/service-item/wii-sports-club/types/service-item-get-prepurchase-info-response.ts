import ServiceItemEShopResponse from '@/nex/protocols/service-item/wii-sports-club/types/service-item-eshop-response';
import List from '@/nex/types/list';
import ServiceItemPrepurchaseInfo from '@/nex/protocols/service-item/wii-sports-club/types/service-item-prepurchase-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemGetPrepurchaseInfoResponse';

export default class ServiceItemGetPrepurchaseInfoResponse extends ServiceItemEShopResponse {
	public get typeName(): string {
		return className;
	}

	private nullablePrepurchaseInfo = new List(new ServiceItemPrepurchaseInfo());

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.nullablePrepurchaseInfo.extractFrom(stream);
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

		json.__fields.nullablePrepurchaseInfo = this.nullablePrepurchaseInfo;

		return json;
	}
}
