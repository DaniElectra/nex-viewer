import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import type NEXByteStream from '@/nex/byte-stream';

export default class DataStorePasswordInfo extends Structure {
	public readonly typeName = 'DataStorePasswordInfo';

	private dataID = new UInt64();
	private accessPassword = new UInt64();
	private updatePassword = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.accessPassword.extractFrom(stream);
		this.updatePassword.extractFrom(stream);
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
		json.__fields.accessPassword = this.accessPassword;
		json.__fields.updatePassword = this.updatePassword;

		return json;
	}
}
