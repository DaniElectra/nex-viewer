import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemAcquireServiceItemResponse';

export default class ServiceItemAcquireServiceItemResponse extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private limitationType = new UInt32();
	private acquiredCount = new UInt32();
	private usedCount = new UInt32();
	private expiryDate = new UInt32();
	private expiredCount = new UInt32();
	private expiryCounts = new List(new UInt32());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.limitationType.extractFrom(stream);
		this.acquiredCount.extractFrom(stream);
		this.usedCount.extractFrom(stream);
		this.expiryDate.extractFrom(stream);
		this.expiredCount.extractFrom(stream);
		this.expiryCounts.extractFrom(stream);
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

		json.__fields.limitationType = this.limitationType;
		json.__fields.acquiredCount = this.acquiredCount;
		json.__fields.usedCount = this.usedCount;
		json.__fields.expiryDate = this.expiryDate;
		json.__fields.expiredCount = this.expiredCount;
		json.__fields.expiryCounts = this.expiryCounts;

		return json;
	}
}
