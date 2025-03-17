import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import PID from '@/nex/types/pid';
import FriendRelationship from '@/nex/protocols/friends-3ds/types/friend-relationship';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AddFriendByPrincipalID';

	private localFriendCode = new UInt64();
	private pid = new PID();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.localFriendCode.extractFrom(stream);
		this.pid.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			localFriendCode: this.localFriendCode,
			pid: this.pid
		};
	}
}

export class Response {
	public static Name = 'AddFriendByPrincipalID';

	private friendRelationship = new FriendRelationship();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.friendRelationship.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			friendRelationship: this.friendRelationship
		};
	}
}