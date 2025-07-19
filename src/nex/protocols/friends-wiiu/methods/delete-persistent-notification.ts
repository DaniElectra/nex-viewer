import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PersistentNotification from '@/nex/protocols/friends-wiiu/types/persistent-notification';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeletePersistentNotification';

	private notifications = new List(new PersistentNotification());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.notifications.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			notifications: this.notifications
		};
	}
}

// * No response data
export class Response {
	public static Name = 'DeletePersistentNotification';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
