import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import ServiceItemGetPurchaseHistoryResponse from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-get-purchase-history-response';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetPurchaseHistoryResponse';

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
	public static Name = 'GetPurchaseHistoryResponse';

	private getPurchaseHistoryResponse = new ServiceItemGetPurchaseHistoryResponse();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.getPurchaseHistoryResponse.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			getPurchaseHistoryResponse: this.getPurchaseHistoryResponse
		};
	}
}
