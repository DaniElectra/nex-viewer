import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import RVBuffer from '@/nex/types/buffer';
import ResultRange from '@/nex/types/result-range';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SearchUsersUserPointParam';

export default class SearchUsersUserPointParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private resultOption = new UInt32();
	private unknown = new RVBuffer();
	private resultRange = new ResultRange();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.resultOption.extractFrom(stream);
		this.unknown.extractFrom(stream);
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

		json.__fields.resultOption = this.resultOption;
		json.__fields.unknown = this.unknown;
		json.__fields.resultRange = this.resultRange;

		return json;
	}
}
