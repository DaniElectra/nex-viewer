import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import type NEXByteStream from '@/nex/byte-stream';

export default class UniqueIdInfo extends Structure {
	public get typeName(): string {
		return 'UniqueIdInfo';
	}

	private nexUniqueId = new UInt64();
	private nexUniqueIdPassword = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.nexUniqueId.extractFrom(stream);
		this.nexUniqueIdPassword.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				nexUniqueId: this.nexUniqueId,
				nexUniqueIdPassword: this.nexUniqueIdPassword
			}
		};
	}
}
