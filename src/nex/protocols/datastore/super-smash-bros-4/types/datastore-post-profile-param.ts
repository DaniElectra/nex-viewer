import DDLClass from '@/nex/types/ddl-class';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStorePostProfileParam';

export default class DataStorePostProfileParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private profile = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.profile.extractFrom(stream);
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

		json.__fields.profile = this.profile;

		return json;
	}
}
