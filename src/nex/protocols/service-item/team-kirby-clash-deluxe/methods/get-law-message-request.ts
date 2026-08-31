import NEXByteStream from '@/nex/byte-stream';
import ServiceItemGetLawMessageParam from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-get-law-message-param';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetLawMessageRequest';

	private getLawMessageParam = new ServiceItemGetLawMessageParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.getLawMessageParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			getLawMessageParam: this.getLawMessageParam
		};
	}
}

export class Response {
	public static Name = 'GetLawMessageRequest';

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
