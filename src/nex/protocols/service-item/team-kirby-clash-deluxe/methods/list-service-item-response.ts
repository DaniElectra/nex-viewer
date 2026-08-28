import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import ServiceItemListServiceItemResponse from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-list-service-item-response';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ListServiceItemResponse';

	private requestId = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.requestId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			requestId: this.requestId
		};
	}
}

export class Response {
	public static Name = 'ListServiceItemResponse';

	private listServiceItemResponse = new ServiceItemListServiceItemResponse();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.listServiceItemResponse.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			listServiceItemResponse: this.listServiceItemResponse
		};
	}
}
