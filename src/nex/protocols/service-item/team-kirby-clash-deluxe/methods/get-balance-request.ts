import NEXByteStream from '@/nex/byte-stream';
import ServiceItemGetBalanceParam from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-get-balance-param';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetBalanceRequest';

	private getBalanceParam = new ServiceItemGetBalanceParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.getBalanceParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			getBalanceParam: this.getBalanceParam
		};
	}
}

export class Response {
	public static Name = 'GetBalanceRequest';

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
