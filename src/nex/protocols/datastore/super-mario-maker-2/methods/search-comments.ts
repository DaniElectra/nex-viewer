import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import List from '@/nex/types/list';
import CommentInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/comment-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchComments';

	private dataID = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.dataID.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dataID: this.dataID
		};
	}
}

export class Response {
	public static Name = 'SearchComments';

	private comments = new List(new CommentInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.comments.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			comments: this.comments
		};
	}
}
