import NEXByteStream from '@/nex/byte-stream';
import AnyDataHolder from '@/nex/types/any-data-holder';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeliverMessage';

	private oUserMessage = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.oUserMessage.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			oUserMessage: this.oUserMessage
		};
	}
}

export class Response {
	public static Name = 'DeliverMessage';

	private oModifiedMessage = new AnyDataHolder();
	private lstSandboxNodeId = new List(new UInt32());
	private lstParticipants = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.oModifiedMessage.extractFrom(stream);
		this.lstSandboxNodeId.extractFrom(stream);
		this.lstParticipants.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			oModifiedMessage: this.oModifiedMessage,
			lstSandboxNodeId: this.lstSandboxNodeId,
			lstParticipants: this.lstParticipants
		};
	}
}
