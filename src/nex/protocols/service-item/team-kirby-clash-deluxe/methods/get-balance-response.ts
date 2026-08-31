import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import ServiceItemGetBalanceResponse from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-get-balance-response';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetBalanceResponse';

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
	public static Name = 'GetBalanceResponse';

	private getBalanceResponse = new ServiceItemGetBalanceResponse();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.getBalanceResponse.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			getBalanceResponse: this.getBalanceResponse
		};
	}
}
