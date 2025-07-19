import Data from '@/nex/types/data';
import UInt64 from '@/nex/types/uint64';
import UInt16 from '@/nex/types/uint16';
import type NEXByteStream from '@/nex/byte-stream';

export default class GameKey extends Data {
	public get typeName(): string {
		return 'GameKey';
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
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				titleID: this.titleID,
				titleVersion: this.titleVersion
			}
		};
	}
}
