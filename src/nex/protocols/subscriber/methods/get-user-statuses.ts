import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import UInt8 from '@/nex/types/uint8';
import SubscriberUserStatusInfo from '@/nex/protocols/subscriber/types/subscriber-user-status-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetUserStatuses';

	private users = new List(new PID());
	private keys = new List(new UInt8());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.users.extractFrom(stream);
		this.keys.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			users: this.users,
			keys: this.keys
		};
	}
}

export class Response {
	public static Name = 'GetUserStatuses';

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
