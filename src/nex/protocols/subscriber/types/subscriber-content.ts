import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import RVString from '@/nex/types/string';
import QBuffer from '@/nex/types/qbuffer';
import PID from '@/nex/types/pid';
import List from '@/nex/types/list';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SubscriberContent';

export default class SubscriberContent extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private contentId = new UInt64();
	private message = new RVString();
	private binary = new QBuffer();
	private pid = new PID();
	private topics = new List(new RVString());
	private postTime = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.contentId.extractFrom(stream);
		this.message.extractFrom(stream);
		this.binary.extractFrom(stream);
		this.pid.extractFrom(stream);
		this.topics.extractFrom(stream);
		this.postTime.extractFrom(stream);
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

		json.__fields.contentId = this.contentId;
		json.__fields.message = this.message;
		json.__fields.binary = this.binary;
		json.__fields.pid = this.pid;
		json.__fields.topics = this.topics;
		json.__fields.postTime = this.postTime;

		return json;
	}
}
