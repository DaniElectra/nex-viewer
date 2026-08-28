import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreGetSharedDataMetaParam';

export default class DataStoreGetSharedDataMetaParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

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

		json.__fields.unknown = this.unknown;

		return json;
	}
}
