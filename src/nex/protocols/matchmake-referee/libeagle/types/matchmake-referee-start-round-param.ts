import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MatchmakeRefereeStartRoundParam';

export default class MatchmakeRefereeStartRoundParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private personalDataCategory = new UInt32();
	private gid = new UInt32();
	private pids = new List(new PID());
	private reportSummaryMode = new UInt8();
	private eventId = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.personalDataCategory.extractFrom(stream);
		this.gid.extractFrom(stream);
		this.pids.extractFrom(stream);
		this.reportSummaryMode.extractFrom(stream);
		this.eventId.extractFrom(stream);
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

		json.__fields.personalDataCategory = this.personalDataCategory;
		json.__fields.gid = this.gid;
		json.__fields.pids = this.pids;
		json.__fields.reportSummaryMode = this.reportSummaryMode;
		json.__fields.eventId = this.eventId;

		return json;
	}
}
