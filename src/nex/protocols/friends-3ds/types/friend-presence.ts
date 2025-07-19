import Data from '@/nex/types/data';
import PID from '@/nex/types/pid';
import NintendoPresence from '@/nex/protocols/friends-3ds/types/nintendo-presence';
import type NEXByteStream from '@/nex/byte-stream';

export default class FriendPresence extends Data {
	public get typeName(): string {
		return 'FriendPresence';
	}

	private pid = new PID();
	private nintendoPresence = new NintendoPresence();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.nintendoPresence.extractFrom(stream);
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
				nintendoPresence: this.nintendoPresence
			}
		};
	}
}
