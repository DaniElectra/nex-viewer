import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemGetBalanceParam';

export default class ServiceItemGetBalanceParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private language = new RVString();
	private titleId = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.language.extractFrom(stream);
		this.titleId.extractFrom(stream);
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

		json.__fields.language = this.language;
		json.__fields.titleId = this.titleId;

		return json;
	}
}
