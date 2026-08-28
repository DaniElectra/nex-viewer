import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GetWorldMapParam';

export default class GetWorldMapParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private ids = new List(new RVString());
	private resultOption = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.ids.extractFrom(stream);
		this.resultOption.extractFrom(stream);
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

		json.__fields.ids = this.ids;
		json.__fields.resultOption = this.resultOption;

		return json;
	}
}
