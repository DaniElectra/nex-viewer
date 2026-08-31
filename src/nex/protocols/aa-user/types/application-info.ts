import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt16 from '@/nex/types/uint16';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ApplicationInfo';

export default class ApplicationInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private titleID = new UInt64();
	private titleVersion = new UInt16();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.titleID.extractFrom(stream);
		this.titleVersion.extractFrom(stream);
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

		json.__fields.titleID = this.titleID;
		json.__fields.titleVersion = this.titleVersion;

		return json;
	}
}
