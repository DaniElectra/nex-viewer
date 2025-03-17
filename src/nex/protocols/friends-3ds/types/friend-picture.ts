import Data from '@/nex/types/data';
import UInt32 from '@/nex/types/uint32';
import RVBuffer from '@/nex/types/buffer';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

export default class FriendPicture extends Data {
	public get typeName(): string {
		return 'FriendPicture';
	}

	private unknown1 = new UInt32();
	private data = new RVBuffer();
	private unknown2 = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.data.extractFrom(stream);
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
				data: this.data,
				unknown2: this.unknown2
			}
		};
	}
}