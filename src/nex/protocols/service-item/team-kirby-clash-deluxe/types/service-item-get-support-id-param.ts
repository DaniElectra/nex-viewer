import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemGetSupportIdParam';

export default class ServiceItemGetSupportIdParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private uniqueId = new UInt32();
	private platform?: UInt8; // * Revision 1

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.uniqueId.extractFrom(stream);

		if (this.revision >= 1) {
			this.platform = new UInt8();
			this.platform.extractFrom(stream);
		}
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

		json.__fields.uniqueId = this.uniqueId;

		if (this.platform !== undefined) {
			json.__fields.platform = this.platform;
		}

		return json;
	}
}
