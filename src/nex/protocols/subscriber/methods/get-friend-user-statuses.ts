import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt8 from '@/nex/types/uint8';
import SubscriberUserStatusInfo from '@/nex/protocols/subscriber/types/subscriber-user-status-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetFriendUserStatuses';

	private keys = new List(new UInt8());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.keys.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			keys: this.keys
		};
	}
}

export class Response {
	public static Name = 'GetFriendUserStatuses';

	private infos = new List(new SubscriberUserStatusInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.infos.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			infos: this.infos
		};
	}
}
