import NEXByteStream from '@/nex/byte-stream';
import QBuffer from '@/nex/types/qbuffer';
import DateTime from '@/nex/types/datetime';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'VerifyAndRegisterTicket';

	private ticketEnvelope = new QBuffer();
	private purchasedTime = new DateTime();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.ticketEnvelope.extractFrom(stream);
		this.purchasedTime.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			ticketEnvelope: this.ticketEnvelope,
			purchasedTime: this.purchasedTime
		};
	}
}

export class Response {
	public static Name = 'VerifyAndRegisterTicket';

	private expireTime = new DateTime();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.expireTime.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			expireTime: this.expireTime
		};
	}
}
