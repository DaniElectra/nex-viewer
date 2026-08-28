import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import ServiceItemUseServiceItemResponse from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-use-service-item-response';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UseServiceItemByAccountResponse';

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
	public static Name = 'UseServiceItemByAccountResponse';

	private useServiceItemResponse = new ServiceItemUseServiceItemResponse();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.useServiceItemResponse.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			useServiceItemResponse: this.useServiceItemResponse
		};
	}
}
