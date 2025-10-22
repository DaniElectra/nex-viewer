import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeliverMessageMultiTarget';

	private lstTarget = new List(new PID());
	private oUserMessage = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.lstTarget.extractFrom(stream);
		this.oUserMessage.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstTarget: this.lstTarget,
			oUserMessage: this.oUserMessage
		};
	}
}

// * No response data
export class Response {
	public static Name = 'DeliverMessageMultiTarget';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
