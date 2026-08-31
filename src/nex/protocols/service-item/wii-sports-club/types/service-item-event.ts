import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import Int32 from '@/nex/types/int32';
import RVString from '@/nex/types/string';
import QBuffer from '@/nex/types/qbuffer';
import UInt32 from '@/nex/types/uint32';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemEvent';

export default class ServiceItemEvent extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private eventId = new UInt64();
	private paramInt = new Int32();
	private paramString = new RVString();
	private paramBinary = new QBuffer();
	private presentTicketType = new UInt32();
	private presentTicketNum = new UInt32();
	private timeBegin = new DateTime();
	private timeEnd = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.eventId.extractFrom(stream);
		this.paramInt.extractFrom(stream);
		this.paramString.extractFrom(stream);
		this.paramBinary.extractFrom(stream);
		this.presentTicketType.extractFrom(stream);
		this.presentTicketNum.extractFrom(stream);
		this.timeBegin.extractFrom(stream);
		this.timeEnd.extractFrom(stream);
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

		json.__fields.eventId = this.eventId;
		json.__fields.paramInt = this.paramInt;
		json.__fields.paramString = this.paramString;
		json.__fields.paramBinary = this.paramBinary;
		json.__fields.presentTicketType = this.presentTicketType;
		json.__fields.presentTicketNum = this.presentTicketNum;
		json.__fields.timeBegin = this.timeBegin;
		json.__fields.timeEnd = this.timeEnd;

		return json;
	}
}
