import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import ResultRange from '@/nex/types/result-range';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SearchCoursesPostedByParam';

export default class SearchCoursesPostedByParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private resultOption = new UInt32();
	private resultRange = new ResultRange();
	private ownerPIDs = new List(new PID());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.resultOption.extractFrom(stream);
		this.resultRange.extractFrom(stream);
		this.ownerPIDs.extractFrom(stream);
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

		json.__fields.resultOption = this.resultOption;
		json.__fields.resultRange = this.resultRange;
		json.__fields.ownerPIDs = this.ownerPIDs;

		return json;
	}
}
