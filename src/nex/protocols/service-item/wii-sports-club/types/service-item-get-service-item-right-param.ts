import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemGetServiceItemRightParam';

export default class ServiceItemGetServiceItemRightParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private referenceId = new RVString();
	private titleId = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.referenceId.extractFrom(stream);
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

		json.__fields.referenceId = this.referenceId;
		json.__fields.titleId = this.titleId;

		return json;
	}
}
