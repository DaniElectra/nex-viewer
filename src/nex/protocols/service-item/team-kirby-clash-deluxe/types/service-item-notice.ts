import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import Int32 from '@/nex/types/int32';
import RVString from '@/nex/types/string';
import QBuffer from '@/nex/types/qbuffer';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemNotice';

export default class ServiceItemNotice extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private scheduleId = new UInt64();
	private scheduleType = new UInt32();
	private paramInt = new Int32();
	private paramString = new RVString();
	private paramBinary = new QBuffer();
	private timeBegin = new DateTime();
	private timeEnd = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.scheduleId.extractFrom(stream);
		this.scheduleType.extractFrom(stream);
		this.paramInt.extractFrom(stream);
		this.paramString.extractFrom(stream);
		this.paramBinary.extractFrom(stream);
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

		json.__fields.scheduleId = this.scheduleId;
		json.__fields.scheduleType = this.scheduleType;
		json.__fields.paramInt = this.paramInt;
		json.__fields.paramString = this.paramString;
		json.__fields.paramBinary = this.paramBinary;
		json.__fields.timeBegin = this.timeBegin;
		json.__fields.timeEnd = this.timeEnd;

		return json;
	}
}
