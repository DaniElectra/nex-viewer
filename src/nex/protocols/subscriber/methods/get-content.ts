import NEXByteStream from '@/nex/byte-stream';
import SubscriberGetContentParam from '@/nex/protocols/subscriber/types/subscriber-get-content-param';
import List from '@/nex/types/list';
import SubscriberContent from '@/nex/protocols/subscriber/types/subscriber-content';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetContent';

	private param = new SubscriberGetContentParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param
		};
	}
}

export class Response {
	public static Name = 'GetContent';

	private contents = new List(new SubscriberContent());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.contents.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			contents: this.contents
		};
	}
}
