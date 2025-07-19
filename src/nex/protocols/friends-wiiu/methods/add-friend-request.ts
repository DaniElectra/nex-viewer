import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import UInt8 from '@/nex/types/uint8';
import RVString from '@/nex/types/string';
import GameKey from '@/nex/protocols/friends-wiiu/types/game-key';
import DateTime from '@/nex/types/datetime';
import FriendRequest from '@/nex/protocols/friends-wiiu/types/friend-request';
import FriendInfo from '@/nex/protocols/friends-wiiu/types/friend-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AddFriendRequest';

	private pid = new PID();
	private unknown1 = new UInt8();
	private message = new RVString();
	private unknown2 = new UInt8();
	private unknown3 = new RVString();
	private gameKey = new GameKey();
	private unknown4 = new DateTime();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pid.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.message.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.gameKey.extractFrom(stream);
		this.unknown4.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pid: this.pid,
			unknown1: this.unknown1,
			message: this.message,
			unknown2: this.unknown2,
			unknown3: this.unknown3,
			gameKey: this.gameKey,
			unknown4: this.unknown4
		};
	}
}

export class Response {
	public static Name = 'AddFriendRequest';

	private friendRequest = new FriendRequest();
	private friendInfo = new FriendInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.friendRequest.extractFrom(stream);
		this.friendInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			friendRequest: this.friendRequest,
			friendInfo: this.friendInfo
		};
	}
}
