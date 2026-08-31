import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import ServiceItemRightInfo from '@/nex/protocols/service-item/wii-sports-club/types/service-item-right-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemRightInfos';

export default class ServiceItemRightInfos extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private rightInfos = new List(new ServiceItemRightInfo());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.rightInfos.extractFrom(stream);
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

		json.__fields.rightInfos = this.rightInfos;

		return json;
	}
}
