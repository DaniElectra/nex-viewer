import ServiceItemEShopResponse from '@/nex/protocols/service-item/wii-sports-club/types/service-item-eshop-response';
import List from '@/nex/types/list';
import ServiceItemRightInfos from '@/nex/protocols/service-item/wii-sports-club/types/service-item-right-infos';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemGetServiceItemRightResponse';

export default class ServiceItemGetServiceItemRightResponse extends ServiceItemEShopResponse {
	public get typeName(): string {
		return className;
	}

	private nullableRightInfos = new List(new ServiceItemRightInfos());

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.nullableRightInfos.extractFrom(stream);
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

		json.__fields.nullableRightInfos = this.nullableRightInfos;

		return json;
	}
}
