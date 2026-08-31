import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt8 from '@/nex/types/uint8';
import PID from '@/nex/types/pid';
import Int32 from '@/nex/types/int32';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreGetCourseRecordResult';

export default class DataStoreGetCourseRecordResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private slot = new UInt8();
	private firstPid = new PID();
	private bestPid = new PID();
	private bestScore = new Int32();
	private createdTime = new DateTime();
	private updatedTime = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.slot.extractFrom(stream);
		this.firstPid.extractFrom(stream);
		this.bestPid.extractFrom(stream);
		this.bestScore.extractFrom(stream);
		this.createdTime.extractFrom(stream);
		this.updatedTime.extractFrom(stream);
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

		json.__fields.dataId = this.dataId;
		json.__fields.slot = this.slot;
		json.__fields.firstPid = this.firstPid;
		json.__fields.bestPid = this.bestPid;
		json.__fields.bestScore = this.bestScore;
		json.__fields.createdTime = this.createdTime;
		json.__fields.updatedTime = this.updatedTime;

		return json;
	}
}
