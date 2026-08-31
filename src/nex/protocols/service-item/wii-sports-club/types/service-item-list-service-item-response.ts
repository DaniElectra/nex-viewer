import ServiceItemEShopResponse from '@/nex/protocols/service-item/wii-sports-club/types/service-item-eshop-response';
import List from '@/nex/types/list';
import ServiceItemCatalog from '@/nex/protocols/service-item/wii-sports-club/types/service-item-catalog';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemListServiceItemResponse';

export default class ServiceItemListServiceItemResponse extends ServiceItemEShopResponse {
	public get typeName(): string {
		return className;
	}

	private nullableCatalog = new List(new ServiceItemCatalog());

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.nullableCatalog.extractFrom(stream);
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

		json.__fields.nullableCatalog = this.nullableCatalog;

		return json;
	}
}
