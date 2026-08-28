import NEXByteStream from '@/nex/byte-stream';
import ServiceItemRequestTicketRestorationParam from '@/nex/protocols/service-item/wii-sports-club/types/service-item-request-ticket-restoration-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RequestTicketRestoration';

	private requestTicketRestorationParam = new ServiceItemRequestTicketRestorationParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.requestTicketRestorationParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			requestTicketRestorationParam: this.requestTicketRestorationParam
		};
	}
}

// * No response data
export class Response {
	public static Name = 'RequestTicketRestoration';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
