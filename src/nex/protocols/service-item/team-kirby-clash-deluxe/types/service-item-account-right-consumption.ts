import ServiceItemAccountRight from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-account-right';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemAccountRightConsumption';

export default class ServiceItemAccountRightConsumption extends ServiceItemAccountRight {
	public get typeName(): string {
		return className;
	}

	private usedCount = new UInt32();
	private expiredCount = new UInt32();
	private expiryCounts = new List(new UInt32());

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.usedCount.extractFrom(stream);
		this.expiredCount.extractFrom(stream);
		this.expiryCounts.extractFrom(stream);
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

		json.__fields.usedCount = this.usedCount;
		json.__fields.expiredCount = this.expiredCount;
		json.__fields.expiryCounts = this.expiryCounts;

		return json;
	}
}
