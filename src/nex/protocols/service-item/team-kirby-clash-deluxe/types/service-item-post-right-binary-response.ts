import ServiceItemEShopResponse from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-eshop-response';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemPostRightBinaryResponse';

export default class ServiceItemPostRightBinaryResponse extends ServiceItemEShopResponse {
	public get typeName(): string {
		return className;
	}

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);
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

		return json;
	}
}
