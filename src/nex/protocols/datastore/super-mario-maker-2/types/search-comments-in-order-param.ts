import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import ResultRange from '@/nex/types/result-range';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SearchCommentsInOrderParam';

export default class SearchCommentsInOrderParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private resultRange = new ResultRange();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
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

		json.__fields.dataId = this.dataId;
		json.__fields.resultRange = this.resultRange;

		return json;
	}
}
