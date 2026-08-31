import DDLClass from '@/nex/types/ddl-class';
import Bool from '@/nex/types/bool';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemLawMessage';

export default class ServiceItemLawMessage extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private isMessageRequired = new Bool();
	private lawMessage = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.isMessageRequired.extractFrom(stream);
		this.lawMessage.extractFrom(stream);
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

		json.__fields.isMessageRequired = this.isMessageRequired;
		json.__fields.lawMessage = this.lawMessage;

		return json;
	}
}
