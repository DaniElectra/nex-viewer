import ServiceItemEShopResponse from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-eshop-response';
import List from '@/nex/types/list';
import ServiceItemAmount from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-amount';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemGetBalanceResponse';

export default class ServiceItemGetBalanceResponse extends ServiceItemEShopResponse {
	public get typeName(): string {
		return className;
	}

	private nullableBalance = new List(new ServiceItemAmount());

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.nullableBalance.extractFrom(stream);
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

		json.__fields.nullableBalance = this.nullableBalance;

		return json;
	}
}
