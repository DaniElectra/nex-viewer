import Data from '@/nex/types/data';
import List from '@/nex/types/list';
import PersistentNotification from '@/nex/protocols/friends-wiiu/types/persistent-notification';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'PersistentNotificationList';

export default class PersistentNotificationList extends Data {
	public get typeName(): string {
		return className;
	}

	private notifications = new List(new PersistentNotification());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.notifications.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__version: this.structureVersion,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				notifications: this.notifications
			}
		};
	}
}
