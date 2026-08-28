import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import ServiceItemLimitation from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-limitation';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemGetPrepurchaseInfoParam';

export default class ServiceItemGetPrepurchaseInfoParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private itemCode = new RVString();
	private referenceId = new RVString();
	private limitation = new ServiceItemLimitation();
	private language = new RVString();
	private uniqueId = new UInt32();
	private platform?: UInt8; // * Revision 1

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.itemCode.extractFrom(stream);
		this.referenceId.extractFrom(stream);
		this.limitation.extractFrom(stream);
		this.language.extractFrom(stream);
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

		json.__fields.itemCode = this.itemCode;
		json.__fields.referenceId = this.referenceId;
		json.__fields.limitation = this.limitation;
		json.__fields.language = this.language;
		json.__fields.uniqueId = this.uniqueId;

		if (this.platform !== undefined) {
			json.__fields.platform = this.platform;
		}

		return json;
	}
}
