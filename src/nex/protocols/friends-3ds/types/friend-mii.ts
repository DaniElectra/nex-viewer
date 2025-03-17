import Data from '@/nex/types/data';
import PID from '@/nex/types/pid';
import Mii from '@/nex/protocols/friends-3ds/types/mii';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

export default class FriendMii extends Data {
	public get typeName(): string {
		return 'FriendMii';
	}

	private pid = new PID();
	private mii = new Mii();
	private modified = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.mii.extractFrom(stream);
		this.modified.extractFrom(stream);
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
				pid: this.pid,
				mii: this.mii,
				modified: this.modified
			}
		};
	}
}