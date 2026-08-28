import DDLClass from '@/nex/types/ddl-class';
import Int32 from '@/nex/types/int32';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import Int8 from '@/nex/types/int8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'OLSProfile';

export default class OLSProfile extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private PID = new Int32();
	private Name = new RVString();
	private costume = new UInt32();
	private country = new UInt32();
	private level = new Int8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.PID.extractFrom(stream);
		this.Name.extractFrom(stream);
		this.costume.extractFrom(stream);
		this.country.extractFrom(stream);
		this.level.extractFrom(stream);
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

		json.__fields.PID = this.PID;
		json.__fields.Name = this.Name;
		json.__fields.costume = this.costume;
		json.__fields.country = this.country;
		json.__fields.level = this.level;

		return json;
	}
}
