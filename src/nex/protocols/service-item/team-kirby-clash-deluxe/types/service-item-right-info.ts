import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemRightInfo';

export default class ServiceItemRightInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private referenceId = new RVString();
	private referenceIdType = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.referenceId.extractFrom(stream);
		this.referenceIdType.extractFrom(stream);
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

		json.__fields.referenceId = this.referenceId;
		json.__fields.referenceIdType = this.referenceIdType;

		return json;
	}
}
