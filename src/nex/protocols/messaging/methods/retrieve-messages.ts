import NEXByteStream from '@/nex/byte-stream';
import MessageRecipient from '@/nex/protocols/messaging/types/message-recipient';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RetrieveMessages';

	private recipient = new MessageRecipient();
	private lstMsgIDs = new List(new UInt32());
	private bLeaveOnServer = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.recipient.extractFrom(stream);
		this.lstMsgIDs.extractFrom(stream);
		this.bLeaveOnServer.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			recipient: this.recipient,
			lstMsgIDs: this.lstMsgIDs,
			bLeaveOnServer: this.bLeaveOnServer
		};
	}
}

export class Response {
	public static Name = 'RetrieveMessages';

	private lstMessages = new List(new AnyDataHolder());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.lstMessages.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstMessages: this.lstMessages
		};
	}
}
