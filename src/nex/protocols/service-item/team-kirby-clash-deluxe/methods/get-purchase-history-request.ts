import NEXByteStream from '@/nex/byte-stream';
import ServiceItemGetPurchaseHistoryParam from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-get-purchase-history-param';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetPurchaseHistoryRequest';

	private getPurchaseHistoryParam = new ServiceItemGetPurchaseHistoryParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.getPurchaseHistoryParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			getPurchaseHistoryParam: this.getPurchaseHistoryParam
		};
	}
}

export class Response {
	public static Name = 'GetPurchaseHistoryRequest';

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
