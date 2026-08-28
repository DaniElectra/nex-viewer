import ServiceItemEShopResponse from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-eshop-response';
import List from '@/nex/types/list';
import ServiceItemLawMessage from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-law-message';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemGetLawMessageResponse';

export default class ServiceItemGetLawMessageResponse extends ServiceItemEShopResponse {
	public get typeName(): string {
		return className;
	}

	private nullableLawMessage = new List(new ServiceItemLawMessage());

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.nullableLawMessage.extractFrom(stream);
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

		json.__fields.nullableLawMessage = this.nullableLawMessage;

		return json;
	}
}
