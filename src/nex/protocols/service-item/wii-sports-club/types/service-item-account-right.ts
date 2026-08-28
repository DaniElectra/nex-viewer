import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import ServiceItemLimitation from '@/nex/protocols/service-item/wii-sports-club/types/service-item-limitation';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemAccountRight';

export default class ServiceItemAccountRight extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private pid = new PID();
	private limitation = new ServiceItemLimitation();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.limitation.extractFrom(stream);
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

		return json;
	}
}
