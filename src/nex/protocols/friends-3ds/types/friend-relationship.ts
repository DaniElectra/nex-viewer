import Data from '@/nex/types/data';
import PID from '@/nex/types/pid';
import UInt64 from '@/nex/types/uint64';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

export default class FriendRelationship extends Data {
	public get typeName(): string {
		return 'FriendRelationship';
	}

	private pid = new PID();
	private localFriendCode = new UInt64();
	private relationshipType = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.localFriendCode.extractFrom(stream);
		this.relationshipType.extractFrom(stream);
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
				localFriendCode: this.localFriendCode,
				relationshipType: this.relationshipType
			}
		};
	}
}
