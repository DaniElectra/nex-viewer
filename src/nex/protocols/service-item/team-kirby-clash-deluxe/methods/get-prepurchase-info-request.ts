import NEXByteStream from '@/nex/byte-stream';
import ServiceItemGetPrepurchaseInfoParam from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-get-prepurchase-info-param';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetPrepurchaseInfoRequest';

	private getPrepurchaseInfoParam = new ServiceItemGetPrepurchaseInfoParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.getPrepurchaseInfoParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			getPrepurchaseInfoParam: this.getPrepurchaseInfoParam
		};
	}
}

export class Response {
	public static Name = 'GetPrepurchaseInfoRequest';

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
