import NEXByteStream from '@/nex/byte-stream';
import ServiceItemPurchaseServiceItemParam from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-purchase-service-item-param';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PurchaseServiceItemRequest';

	private purchaseServiceItemParam = new ServiceItemPurchaseServiceItemParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.purchaseServiceItemParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			purchaseServiceItemParam: this.purchaseServiceItemParam
		};
	}
}

export class Response {
	public static Name = 'PurchaseServiceItemRequest';

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
