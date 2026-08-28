import NEXByteStream from '@/nex/byte-stream';
import ServiceItemGetNoticeParam from '@/nex/protocols/service-item/wii-sports-club/types/service-item-get-notice-param';
import ServiceItemNotice from '@/nex/protocols/service-item/wii-sports-club/types/service-item-notice';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetNotice';

	private getNoticeParam = new ServiceItemGetNoticeParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.getNoticeParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			getNoticeParam: this.getNoticeParam
		};
	}
}

export class Response {
	public static Name = 'GetNotice';

	private notice = new ServiceItemNotice();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.notice.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			notice: this.notice
		};
	}
}
