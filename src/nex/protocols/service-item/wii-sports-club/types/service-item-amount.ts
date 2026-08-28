import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemAmount';

export default class ServiceItemAmount extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private formattedAmount = new RVString();
	private currency = new RVString();
	private rawValue = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.formattedAmount.extractFrom(stream);
		this.currency.extractFrom(stream);
		this.rawValue.extractFrom(stream);
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

		json.__fields.formattedAmount = this.formattedAmount;
		json.__fields.currency = this.currency;
		json.__fields.rawValue = this.rawValue;

		return json;
	}
}
