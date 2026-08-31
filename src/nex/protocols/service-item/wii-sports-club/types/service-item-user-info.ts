import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemUserInfo';

export default class ServiceItemUserInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private numTotalEntryTicket = new UInt32();
	private applicationBuffer = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.numTotalEntryTicket.extractFrom(stream);
		this.applicationBuffer.extractFrom(stream);
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

		json.__fields.numTotalEntryTicket = this.numTotalEntryTicket;
		json.__fields.applicationBuffer = this.applicationBuffer;

		return json;
	}
}
