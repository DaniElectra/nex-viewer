import NEXByteStream from '@/nex/byte-stream';
import MessageRecipient from '@/nex/protocols/messaging/types/message-recipient';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeleteMessages';

	private recipient = new MessageRecipient();
	private lstMessagesToDelete = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.recipient.extractFrom(stream);
		this.lstMessagesToDelete.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			recipient: this.recipient,
			lstMessagesToDelete: this.lstMessagesToDelete
		};
	}
}

// * No response data
export class Response {
	public static Name = 'DeleteMessages';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
