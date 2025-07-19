import Data from '@/nex/types/data';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

export default class FriendComment extends Data {
	public get typeName(): string {
		return 'FriendComment';
	}

	private pid = new PID();
	private comment = new RVString();
	private modified = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.comment.extractFrom(stream);
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
				comment: this.comment,
				modified: this.modified
			}
		};
	}
}
