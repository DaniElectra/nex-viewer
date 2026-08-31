import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CoconutViolation';

export default class CoconutViolation extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private categoryCode = new RVString();
	private reason = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.categoryCode.extractFrom(stream);
		this.reason.extractFrom(stream);
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
		json.__fields.categoryCode = this.categoryCode;
		json.__fields.reason = this.reason;

		return json;
	}
}
