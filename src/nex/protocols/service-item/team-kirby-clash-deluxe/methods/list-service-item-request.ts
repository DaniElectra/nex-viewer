import NEXByteStream from '@/nex/byte-stream';
import ServiceItemListServiceItemParam from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-list-service-item-param';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ListServiceItemRequest';

	private listServiceItemParam = new ServiceItemListServiceItemParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.listServiceItemParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			listServiceItemParam: this.listServiceItemParam
		};
	}
}

export class Response {
	public static Name = 'ListServiceItemRequest';

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
