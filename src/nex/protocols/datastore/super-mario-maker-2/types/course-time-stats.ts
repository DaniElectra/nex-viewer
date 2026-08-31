import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CourseTimeStats';

export default class CourseTimeStats extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private userIDOfFirstCompletion = new PID();
	private userIDOfWorldRecordHolder = new PID();
	private worldRecord = new UInt32();
	private timeOfUploader = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.userIDOfFirstCompletion.extractFrom(stream);
		this.userIDOfWorldRecordHolder.extractFrom(stream);
		this.worldRecord.extractFrom(stream);
		this.timeOfUploader.extractFrom(stream);
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

		json.__fields.userIDOfFirstCompletion = this.userIDOfFirstCompletion;
		json.__fields.userIDOfWorldRecordHolder = this.userIDOfWorldRecordHolder;
		json.__fields.worldRecord = this.worldRecord;
		json.__fields.timeOfUploader = this.timeOfUploader;

		return json;
	}
}
