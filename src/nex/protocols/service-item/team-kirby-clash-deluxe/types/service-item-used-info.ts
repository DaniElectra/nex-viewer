import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemUsedInfo';

export default class ServiceItemUsedInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private acquiredCount = new UInt32();
	private usedCount = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.acquiredCount.extractFrom(stream);
		this.usedCount.extractFrom(stream);
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

		json.__fields.acquiredCount = this.acquiredCount;
		json.__fields.usedCount = this.usedCount;

		return json;
	}
}
