import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import SubscriberGetContentParam from '@/nex/protocols/subscriber/types/subscriber-get-content-param';
import SubscriberContent from '@/nex/protocols/subscriber/types/subscriber-content';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetContentMulti';

	private param = new List(new SubscriberGetContentParam());

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
	public static Name = 'GetContentMulti';

	private contents = new List(new List(new SubscriberContent()));

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
