import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import ServiceItemPurchaseServiceItemResponse from '@/nex/protocols/service-item/wii-sports-club/types/service-item-purchase-service-item-response';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PurchaseServiceItemResponse';

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
	public static Name = 'PurchaseServiceItemResponse';

	private purchaseServiceItemResponse = new ServiceItemPurchaseServiceItemResponse();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.purchaseServiceItemResponse.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			purchaseServiceItemResponse: this.purchaseServiceItemResponse
		};
	}
}
