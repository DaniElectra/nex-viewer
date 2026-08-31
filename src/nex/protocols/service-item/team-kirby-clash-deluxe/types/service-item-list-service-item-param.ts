import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemListServiceItemParam';

export default class ServiceItemListServiceItemParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private language = new RVString();
	private offset = new UInt32();
	private size = new UInt32();
	private isBalanceAvailable = new Bool();
	private uniqueId = new UInt32();
	private platform?: UInt8; // * Revision 1

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.language.extractFrom(stream);
		this.offset.extractFrom(stream);
		this.size.extractFrom(stream);
		this.isBalanceAvailable.extractFrom(stream);
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

		json.__fields.language = this.language;
		json.__fields.offset = this.offset;
		json.__fields.size = this.size;
		json.__fields.isBalanceAvailable = this.isBalanceAvailable;
		json.__fields.uniqueId = this.uniqueId;

		if (this.platform !== undefined) {
			json.__fields.platform = this.platform;
		}

		return json;
	}
}
