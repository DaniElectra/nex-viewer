import NEXByteStream from '@/nex/byte-stream';
import ServiceItemUseServiceItemByAccountParam from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-use-service-item-by-account-param';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UseServiceItemByAccountRequest';

	private useServiceItemByAccountParam = new ServiceItemUseServiceItemByAccountParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.useServiceItemByAccountParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			useServiceItemByAccountParam: this.useServiceItemByAccountParam
		};
	}
}

export class Response {
	public static Name = 'UseServiceItemByAccountRequest';

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
