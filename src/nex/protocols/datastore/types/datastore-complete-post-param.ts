import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import Bool from '@/nex/types/bool';
import type NEXByteStream from '@/nex/byte-stream';

export default class DataStoreCompletePostParam extends Structure {
	public readonly typeName = 'DataStoreCompletePostParam';

	private dataID = new UInt64();
	private isSuccess = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.isSuccess.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {}
		};

		json.__fields.dataID = this.dataID;
		json.__fields.isSuccess = this.isSuccess;

		return json;
	}
}
