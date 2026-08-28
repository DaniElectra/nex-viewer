import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import ServiceItemLimitation from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-limitation';
import List from '@/nex/types/list';
import ServiceItemRightBinary from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-right-binary';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemAccountRight';

export default class ServiceItemAccountRight extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private pid = new PID();
	private limitation = new ServiceItemLimitation();
	private rightBinaries = new List(new ServiceItemRightBinary());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.limitation.extractFrom(stream);
		this.rightBinaries.extractFrom(stream);
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

		json.__fields.pid = this.pid;
		json.__fields.limitation = this.limitation;
		json.__fields.rightBinaries = this.rightBinaries;

		return json;
	}
}
