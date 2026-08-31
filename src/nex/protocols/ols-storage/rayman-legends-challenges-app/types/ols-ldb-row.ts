import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import Float from '@/nex/types/float';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'OLSLdbRow';

export default class OLSLdbRow extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private ID = new UInt32();
	private name = new RVString();
	private value = new Float();
	private costume = new UInt32();
	private statusIcon = new UInt32();
	private country = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.ID.extractFrom(stream);
		this.name.extractFrom(stream);
		this.value.extractFrom(stream);
		this.costume.extractFrom(stream);
		this.statusIcon.extractFrom(stream);
		this.country.extractFrom(stream);
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

		json.__fields.ID = this.ID;
		json.__fields.name = this.name;
		json.__fields.value = this.value;
		json.__fields.costume = this.costume;
		json.__fields.statusIcon = this.statusIcon;
		json.__fields.country = this.country;

		return json;
	}
}
