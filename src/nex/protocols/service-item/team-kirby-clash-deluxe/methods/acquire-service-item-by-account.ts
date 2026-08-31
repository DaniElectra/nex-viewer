import NEXByteStream from '@/nex/byte-stream';
import ServiceItemAcquireServiceItemByAccountParam from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-acquire-service-item-by-account-param';
import ServiceItemAcquireServiceItemResponse from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-acquire-service-item-response';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AcquireServiceItemByAccount';

	private acquireServiceItemByAccountParam = new ServiceItemAcquireServiceItemByAccountParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.acquireServiceItemByAccountParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			acquireServiceItemByAccountParam: this.acquireServiceItemByAccountParam
		};
	}
}

export class Response {
	public static Name = 'AcquireServiceItemByAccount';

	private acquireServiceItemResponse = new ServiceItemAcquireServiceItemResponse();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.acquireServiceItemResponse.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			acquireServiceItemResponse: this.acquireServiceItemResponse
		};
	}
}
