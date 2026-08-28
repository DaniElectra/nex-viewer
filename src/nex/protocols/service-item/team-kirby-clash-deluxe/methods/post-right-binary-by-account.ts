import NEXByteStream from '@/nex/byte-stream';
import ServiceItemPostRightBinaryByAccountParam from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-post-right-binary-by-account-param';
import ServiceItemPostRightBinaryResponse from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-post-right-binary-response';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PostRightBinaryByAccount';

	private postRightBinaryByAccountParam = new ServiceItemPostRightBinaryByAccountParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.postRightBinaryByAccountParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			postRightBinaryByAccountParam: this.postRightBinaryByAccountParam
		};
	}
}

export class Response {
	public static Name = 'PostRightBinaryByAccount';

	private postRightBinaryResponse = new ServiceItemPostRightBinaryResponse();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.postRightBinaryResponse.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			postRightBinaryResponse: this.postRightBinaryResponse
		};
	}
}
