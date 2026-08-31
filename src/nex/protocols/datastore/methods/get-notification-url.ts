import NEXByteStream from '@/nex/byte-stream';
import DataStoreGetNotificationUrlParam from '@/nex/protocols/datastore/types/datastore-get-notification-url-param';
import DataStoreReqGetNotificationUrlInfo from '@/nex/protocols/datastore/types/datastore-req-get-notification-url-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetNotificationUrl';

	private param = new DataStoreGetNotificationUrlParam();

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
	public static Name = 'GetNotificationUrl';

	private info = new DataStoreReqGetNotificationUrlInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.info.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			info: this.info
		};
	}
}
