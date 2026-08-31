import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import UInt64 from '@/nex/types/uint64';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SubscriberGetContentParam';

export default class SubscriberGetContentParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private topic = new RVString();
	private size = new UInt32();
	private offset = new UInt32();
	private minimumContentId = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.topic.extractFrom(stream);
		this.size.extractFrom(stream);
		this.offset.extractFrom(stream);
		this.minimumContentId.extractFrom(stream);
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
		json.__fields.size = this.size;
		json.__fields.offset = this.offset;
		json.__fields.minimumContentId = this.minimumContentId;

		return json;
	}
}
