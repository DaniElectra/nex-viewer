import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SimpleSearchCondition';

export default class SimpleSearchCondition extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private value = new UInt32();
	private comparisonOperator = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.value.extractFrom(stream);
		this.comparisonOperator.extractFrom(stream);
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

		json.__fields.value = this.value;
		json.__fields.comparisonOperator = this.comparisonOperator;

		return json;
	}
}
