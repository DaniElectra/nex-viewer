import ServiceItemRightInfo from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-right-info';
import List from '@/nex/types/list';
import ServiceItemAccountRightTime from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-account-right-time';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemRightTimeInfo';

export default class ServiceItemRightTimeInfo extends ServiceItemRightInfo {
	public get typeName(): string {
		return className;
	}

	private accountRights = new List(new ServiceItemAccountRightTime());

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.accountRights.extractFrom(stream);
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

		json.__fields.accountRights = this.accountRights;

		return json;
	}
}
