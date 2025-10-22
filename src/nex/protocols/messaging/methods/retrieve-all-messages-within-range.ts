import NEXByteStream from '@/nex/byte-stream';
import MessageRecipient from '@/nex/protocols/messaging/types/message-recipient';
import ResultRange from '@/nex/types/result-range';
import List from '@/nex/types/list';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RetrieveAllMessagesWithinRange';

	private recipient = new MessageRecipient();
	private range = new ResultRange();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.recipient.extractFrom(stream);
		this.range.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			recipient: this.recipient,
			range: this.range
		};
	}
}

export class Response {
	public static Name = 'RetrieveAllMessagesWithinRange';

	private lstMessages = new List(new AnyDataHolder());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.lstMessages.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstMessages: this.lstMessages
		};
	}
}
