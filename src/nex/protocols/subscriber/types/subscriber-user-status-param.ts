import DDLClass from '@/nex/types/ddl-class';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SubscriberUserStatusParam';

export default class SubscriberUserStatusParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown.extractFrom(stream);
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

		json.__fields.unknown = this.unknown;

		return json;
	}
}
