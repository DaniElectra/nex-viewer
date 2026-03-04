import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreDeleteParam';

export default class DataStoreDeleteParam extends Structure {
	public get typeName(): string {
		return className;
	}

	private dataID = new UInt64();
	private updatePassword = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.updatePassword.extractFrom(stream);
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

		json.__fields.dataID = this.dataID;
		json.__fields.updatePassword = this.updatePassword;

		return json;
	}
}
