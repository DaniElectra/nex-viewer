import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import ResultRange from '@/nex/types/result-range';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreSearchReplayParam';

export default class DataStoreSearchReplayParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private mode = new UInt8();
	private style = new UInt8();
	private fighter = new UInt8();
	private resultRange = new ResultRange();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.mode.extractFrom(stream);
		this.style.extractFrom(stream);
		this.fighter.extractFrom(stream);
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

		json.__fields.mode = this.mode;
		json.__fields.style = this.style;
		json.__fields.fighter = this.fighter;
		json.__fields.resultRange = this.resultRange;

		return json;
	}
}
