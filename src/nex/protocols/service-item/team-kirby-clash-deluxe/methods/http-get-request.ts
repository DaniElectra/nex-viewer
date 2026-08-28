import NEXByteStream from '@/nex/byte-stream';
import ServiceItemHttpGetParam from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-http-get-param';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'HttpGetRequest';

	private url = new ServiceItemHttpGetParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.url.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			url: this.url
		};
	}
}

export class Response {
	public static Name = 'HttpGetRequest';

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
