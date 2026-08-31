import DDLClass from '@/nex/types/ddl-class';
import Int32 from '@/nex/types/int32';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import Float from '@/nex/types/float';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'OLSTomb';

export default class OLSTomb extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private pid = new Int32();
	private name = new RVString();
	private id_costume = new UInt32();
	private x = new Float();
	private y = new Float();
	private z = new Float();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.name.extractFrom(stream);
		this.id_costume.extractFrom(stream);
		this.x.extractFrom(stream);
		this.y.extractFrom(stream);
		this.z.extractFrom(stream);
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

		json.__fields.pid = this.pid;
		json.__fields.name = this.name;
		json.__fields.id_costume = this.id_costume;
		json.__fields.x = this.x;
		json.__fields.y = this.y;
		json.__fields.z = this.z;

		return json;
	}
}
