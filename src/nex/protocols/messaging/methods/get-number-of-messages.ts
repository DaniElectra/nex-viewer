import NEXByteStream from '@/nex/byte-stream';
import MessageRecipient from '@/nex/protocols/messaging/types/message-recipient';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetNumberOfMessages';

	private recipient = new MessageRecipient();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.recipient.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			recipient: this.recipient
		};
	}
}

export class Response {
	public static Name = 'GetNumberOfMessages';

	private uiNbMessages = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uiNbMessages.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiNbMessages: this.uiNbMessages
		};
	}
}
