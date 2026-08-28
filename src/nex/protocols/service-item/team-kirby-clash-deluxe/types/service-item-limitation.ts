import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemLimitation';

export default class ServiceItemLimitation extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private limitationType = new UInt32();
	private limitationValue = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.limitationType.extractFrom(stream);
		this.limitationValue.extractFrom(stream);
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
		json.__fields.limitationValue = this.limitationValue;

		return json;
	}
}
