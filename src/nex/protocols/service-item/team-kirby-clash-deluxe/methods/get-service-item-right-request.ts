import NEXByteStream from '@/nex/byte-stream';
import ServiceItemGetServiceItemRightParam from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-get-service-item-right-param';
import Bool from '@/nex/types/bool';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetServiceItemRightRequest';

	private getServiceItemRightParam = new ServiceItemGetServiceItemRightParam();
	private withoutRightBinary = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.getServiceItemRightParam.extractFrom(stream);
		this.withoutRightBinary.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			getServiceItemRightParam: this.getServiceItemRightParam,
			withoutRightBinary: this.withoutRightBinary
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
