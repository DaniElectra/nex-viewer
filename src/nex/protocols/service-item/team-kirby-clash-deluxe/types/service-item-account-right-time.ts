import ServiceItemAccountRight from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-account-right';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemAccountRightTime';

export default class ServiceItemAccountRightTime extends ServiceItemAccountRight {
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
