import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MatchmakeBlockListParam';

export default class MatchmakeBlockListParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private optionFlag = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.optionFlag.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				optionFlag: this.optionFlag
			}
		};
	}
}
