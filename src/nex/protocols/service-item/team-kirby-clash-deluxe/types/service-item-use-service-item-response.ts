import ServiceItemEShopResponse from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-eshop-response';
import List from '@/nex/types/list';
import ServiceItemUsedInfo from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-used-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemUseServiceItemResponse';

export default class ServiceItemUseServiceItemResponse extends ServiceItemEShopResponse {
	public get typeName(): string {
		return className;
	}

	private nullableUsedInfo = new List(new ServiceItemUsedInfo());

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.nullableUsedInfo.extractFrom(stream);
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

		json.__fields.nullableUsedInfo = this.nullableUsedInfo;

		return json;
	}
}
