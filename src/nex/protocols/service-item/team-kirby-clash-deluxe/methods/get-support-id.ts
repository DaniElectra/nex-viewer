import NEXByteStream from '@/nex/byte-stream';
import ServiceItemGetSupportIdParam from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-get-support-id-param';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetSupportId';

	private getSupportIdParam = new ServiceItemGetSupportIdParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.getSupportIdParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			getSupportIdParam: this.getSupportIdParam
		};
	}
}

export class Response {
	public static Name = 'GetSupportId';

	private supportId = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.supportId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			supportId: this.supportId
		};
	}
}
