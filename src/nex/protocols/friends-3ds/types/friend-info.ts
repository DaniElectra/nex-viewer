import Structure from '@/nex/types/structure';
import PID from '@/nex/types/pid';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

export default class FriendInfo extends Structure {
	public readonly typeName = 'FriendInfo';

	private Principalid = new PID();
	private Unknown = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.Principalid.extractFrom(stream);
		this.Unknown.extractFrom(stream);
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
				Principalid: this.Principalid,
				Unknown: this.Unknown
			}
		};
	}
}