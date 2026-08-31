import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import ServiceItemRightConsumptionInfo from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-right-consumption-info';
import ServiceItemRightTimeInfo from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-right-time-info';
import Bool from '@/nex/types/bool';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemRightInfos';

export default class ServiceItemRightInfos extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private supportId = new RVString();
	private consumptionRightInfos = new List(new ServiceItemRightConsumptionInfo());
	private additionalTimeRightInfos = new List(new ServiceItemRightTimeInfo());
	private permanentRightInfos = new List(new ServiceItemRightTimeInfo());
	private alreadyPurchasedInitialOnlyItem = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.supportId.extractFrom(stream);
		this.consumptionRightInfos.extractFrom(stream);
		this.additionalTimeRightInfos.extractFrom(stream);
		this.permanentRightInfos.extractFrom(stream);
		this.alreadyPurchasedInitialOnlyItem.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.supportId = this.supportId;
		json.__fields.consumptionRightInfos = this.consumptionRightInfos;
		json.__fields.additionalTimeRightInfos = this.additionalTimeRightInfos;
		json.__fields.permanentRightInfos = this.permanentRightInfos;
		json.__fields.alreadyPurchasedInitialOnlyItem = this.alreadyPurchasedInitialOnlyItem;

		return json;
	}
}
