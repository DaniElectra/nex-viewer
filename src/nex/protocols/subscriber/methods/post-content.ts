import NEXByteStream from '@/nex/byte-stream';
import SubscriberPostContentParam from '@/nex/protocols/subscriber/types/subscriber-post-content-param';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PostContent';

	private param = new SubscriberPostContentParam();

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
	public static Name = 'PostContent';

	private contentId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.contentId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			contentId: this.contentId
		};
	}
}
