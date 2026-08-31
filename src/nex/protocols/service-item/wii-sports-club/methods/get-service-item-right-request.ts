import NEXByteStream from '@/nex/byte-stream';
import ServiceItemGetServiceItemRightParam from '@/nex/protocols/service-item/wii-sports-club/types/service-item-get-service-item-right-param';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetServiceItemRightRequest';

	private getServiceItemRightParam = new ServiceItemGetServiceItemRightParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.getServiceItemRightParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			getServiceItemRightParam: this.getServiceItemRightParam
		};
	}
}

export class Response {
	public static Name = 'GetServiceItemRightRequest';

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
