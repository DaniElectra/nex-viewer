import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemGetServiceItemRightParam';

export default class ServiceItemGetServiceItemRightParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private referenceId = new RVString();
	private deviceId = new RVString();
	private uniqueId = new UInt32();
	private itemGroup = new UInt8();
	private platform?: UInt8; // * Revision 1

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.referenceId.extractFrom(stream);
		this.deviceId.extractFrom(stream);
		this.uniqueId.extractFrom(stream);
		this.itemGroup.extractFrom(stream);

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

		json.__fields.referenceId = this.referenceId;
		json.__fields.deviceId = this.deviceId;
		json.__fields.uniqueId = this.uniqueId;
		json.__fields.itemGroup = this.itemGroup;

		if (this.platform !== undefined) {
			json.__fields.platform = this.platform;
		}

		return json;
	}
}
