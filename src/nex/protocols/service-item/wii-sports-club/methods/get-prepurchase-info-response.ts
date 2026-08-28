import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import ServiceItemGetPrepurchaseInfoResponse from '@/nex/protocols/service-item/wii-sports-club/types/service-item-get-prepurchase-info-response';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetPrepurchaseInfoResponse';

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
	public static Name = 'GetPrepurchaseInfoResponse';

	private getPrepurchaseInfoResponse = new ServiceItemGetPrepurchaseInfoResponse();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.getPrepurchaseInfoResponse.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			getPrepurchaseInfoResponse: this.getPrepurchaseInfoResponse
		};
	}
}
