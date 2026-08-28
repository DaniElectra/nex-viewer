import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemTicketInfo';

export default class ServiceItemTicketInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private ticketType = new UInt32();
	private numTotal = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.ticketType.extractFrom(stream);
		this.numTotal.extractFrom(stream);
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

		json.__fields.ticketType = this.ticketType;
		json.__fields.numTotal = this.numTotal;

		return json;
	}
}
