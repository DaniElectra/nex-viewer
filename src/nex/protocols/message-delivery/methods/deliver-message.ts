import NEXByteStream from '@/nex/byte-stream';
import AnyDataHolder from '@/nex/types/any-data-holder';
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

// * No response data
export class Response {
	public static Name = 'DeliverMessage';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
