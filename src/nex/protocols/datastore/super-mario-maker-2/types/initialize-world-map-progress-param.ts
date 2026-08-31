import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'InitializeWorldMapProgressParam';

export default class InitializeWorldMapProgressParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private id = new RVString();
	private unknown = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.id.extractFrom(stream);
		this.unknown.extractFrom(stream);
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

		json.__fields.id = this.id;
		json.__fields.unknown = this.unknown;

		return json;
	}
}
