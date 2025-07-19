import Data from '@/nex/types/data';
import UInt32 from '@/nex/types/uint32';
import MiiList from '@/nex/protocols/friends-3ds/types/mii-list';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

export default class FriendMiiList extends Data {
	public get typeName(): string {
		return 'FriendMiiList';
	}

	private unknown1 = new UInt32();
	private miiList = new MiiList();
	private unknown2 = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.miiList.extractFrom(stream);
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
				miiList: this.miiList,
				unknown2: this.unknown2
			}
		};
	}
}
