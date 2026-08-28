import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ApiCallSummary';

export default class ApiCallSummary extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private methodName = new RVString();
	private overMaxCallCount = new UInt32();
	private timerLength = new UInt32();
	private maxCallCount = new UInt32();
	private timerStartTime = new DateTime();
	private markedCallCount = new UInt32();
	private totalCallCount = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.methodName.extractFrom(stream);
		this.overMaxCallCount.extractFrom(stream);
		this.timerLength.extractFrom(stream);
		this.maxCallCount.extractFrom(stream);
		this.timerStartTime.extractFrom(stream);
		this.markedCallCount.extractFrom(stream);
		this.totalCallCount.extractFrom(stream);
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

		json.__fields.methodName = this.methodName;
		json.__fields.overMaxCallCount = this.overMaxCallCount;
		json.__fields.timerLength = this.timerLength;
		json.__fields.maxCallCount = this.maxCallCount;
		json.__fields.timerStartTime = this.timerStartTime;
		json.__fields.markedCallCount = this.markedCallCount;
		json.__fields.totalCallCount = this.totalCallCount;

		return json;
	}
}
