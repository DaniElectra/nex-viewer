import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import RelationObjectReqGetInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/relation-object-req-get-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'EventCourseGhostInfo';

export default class EventCourseGhostInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private replayFile = new RelationObjectReqGetInfo();
	private timeInMilliseconds = new UInt32();
	private userID = new PID();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.replayFile.extractFrom(stream);
		this.timeInMilliseconds.extractFrom(stream);
		this.userID.extractFrom(stream);
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

		json.__fields.replayFile = this.replayFile;
		json.__fields.timeInMilliseconds = this.timeInMilliseconds;
		json.__fields.userID = this.userID;

		return json;
	}
}
