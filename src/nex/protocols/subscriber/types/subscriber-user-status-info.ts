import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import List from '@/nex/types/list';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SubscriberUserStatusInfo';

export default class SubscriberUserStatusInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private pid = new PID();
	private values = new List(new QBuffer());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.values.extractFrom(stream);
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

		json.__fields.pid = this.pid;
		json.__fields.values = this.values;

		return json;
	}
}
