import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import RVString from '@/nex/types/string';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SubscriberPostContentParam';

export default class SubscriberPostContentParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private topic = new List(new RVString());
	private message = new RVString();
	private binary = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.topic.extractFrom(stream);
		this.message.extractFrom(stream);
		this.binary.extractFrom(stream);
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

		json.__fields.topic = this.topic;
		json.__fields.message = this.message;
		json.__fields.binary = this.binary;

		return json;
	}
}
