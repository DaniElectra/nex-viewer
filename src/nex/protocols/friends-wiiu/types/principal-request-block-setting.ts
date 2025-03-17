import Data from '@/nex/types/data';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type NEXByteStream from '@/nex/byte-stream';

export default class PrincipalRequestBlockSetting extends Data {
	public get typeName(): string {
		return 'PrincipalRequestBlockSetting';
	}

	private unknown1 = new UInt32();
	private unknown2 = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
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
				unknown1: this.unknown1,
				unknown2: this.unknown2
			}
		};
	}
}