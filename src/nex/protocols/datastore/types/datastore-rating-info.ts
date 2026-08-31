import DDLClass from '@/nex/types/ddl-class';
import Int64 from '@/nex/types/int64';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreRatingInfo';

export default class DataStoreRatingInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private totalValue = new Int64();
	private count = new UInt32();
	private initialValue = new Int64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.totalValue.extractFrom(stream);
		this.count.extractFrom(stream);
		this.initialValue.extractFrom(stream);
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

		json.__fields.totalValue = this.totalValue;
		json.__fields.count = this.count;
		json.__fields.initialValue = this.initialValue;

		return json;
	}
}
