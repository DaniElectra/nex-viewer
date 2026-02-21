import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import Bool from '@/nex/types/bool';
import DataStoreGetNewArrivedNotificationsParam from '@/nex/protocols/datastore/types/datastore-get-new-arrived-notifications-param';
import DataStoreNotification from '@/nex/protocols/datastore/types/datastore-notification';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetNewArrivedNotifications';

	private param = new DataStoreGetNewArrivedNotificationsParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param
		};
	}
}

export class Response {
	public static Name = 'GetNewArrivedNotifications';

	private pResult = new List(new DataStoreNotification());
	private pHasNext = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pResult.extractFrom(stream);
		this.pHasNext.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pResult: this.pResult,
			pHasNext: this.pHasNext
		};
	}
}
