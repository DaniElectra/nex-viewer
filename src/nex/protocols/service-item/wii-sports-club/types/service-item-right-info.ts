import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import ServiceItemAccountRight from '@/nex/protocols/service-item/wii-sports-club/types/service-item-account-right';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemRightInfo';

export default class ServiceItemRightInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private referenceId = new RVString();
	private accountRights = new List(new ServiceItemAccountRight());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.referenceId.extractFrom(stream);
		this.accountRights.extractFrom(stream);
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

		json.__fields.referenceId = this.referenceId;
		json.__fields.accountRights = this.accountRights;

		return json;
	}
}
