import Structure from '@/nex/types/structure';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreKeyValue';

export default class DataStoreKeyValue extends Structure {
	public get typeName(): string {
		return className;
	}

	private key = new RVString();
	private value = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.key.extractFrom(stream);
		this.value.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.key = this.key;
		json.__fields.value = this.value;

		return json;
	}
}
