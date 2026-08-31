import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import RVString from '@/nex/types/string';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeleteContent';

	private topics = new List(new RVString());
	private contentId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.topics.extractFrom(stream);
		this.contentId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			topics: this.topics,
			contentId: this.contentId
		};
	}
}

// * No response data
export class Response {
	public static Name = 'DeleteContent';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
