import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import Bool from '@/nex/types/bool';
import SearchCommentsInOrderParam from '@/nex/protocols/datastore/super-mario-maker-2/types/search-comments-in-order-param';
import CommentInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/comment-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchCommentsInOrder';

	private param = new SearchCommentsInOrderParam();

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
	public static Name = 'SearchCommentsInOrder';

	private comments = new List(new CommentInfo());
	private unknown = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.comments.extractFrom(stream);
		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			comments: this.comments,
			unknown: this.unknown
		};
	}
}
