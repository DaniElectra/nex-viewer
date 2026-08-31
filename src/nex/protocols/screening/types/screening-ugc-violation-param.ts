import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import ScreeningContextInfo from '@/nex/protocols/screening/types/screening-context-info';
import UInt64 from '@/nex/types/uint64';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ScreeningUgcViolationParam';

export default class ScreeningUgcViolationParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private category = new UInt32();
	private reason = new RVString();
	private context = new List(new ScreeningContextInfo());
	private screenshotDataId = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.category.extractFrom(stream);
		this.reason.extractFrom(stream);
		this.context.extractFrom(stream);
		this.screenshotDataId.extractFrom(stream);
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

		json.__fields.category = this.category;
		json.__fields.reason = this.reason;
		json.__fields.context = this.context;
		json.__fields.screenshotDataId = this.screenshotDataId;

		return json;
	}
}
