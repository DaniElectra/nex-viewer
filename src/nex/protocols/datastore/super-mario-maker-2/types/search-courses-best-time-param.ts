import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import ResultRange from '@/nex/types/result-range';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SearchCoursesBestTimeParam';

export default class SearchCoursesBestTimeParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private pid = new PID();
	private resultOption = new UInt32();
	private resultRange = new ResultRange();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.resultOption.extractFrom(stream);
		this.resultRange.extractFrom(stream);
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

		json.__fields.pid = this.pid;
		json.__fields.resultOption = this.resultOption;
		json.__fields.resultRange = this.resultRange;

		return json;
	}
}
