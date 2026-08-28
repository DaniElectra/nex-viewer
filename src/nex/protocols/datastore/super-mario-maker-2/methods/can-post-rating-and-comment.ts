import NEXByteStream from '@/nex/byte-stream';
import CanPostRatingAndCommentParam from '@/nex/protocols/datastore/super-mario-maker-2/types/can-post-rating-and-comment-param';
import CanPostRatingAndCommentResult from '@/nex/protocols/datastore/super-mario-maker-2/types/can-post-rating-and-comment-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CanPostRatingAndComment';

	private param = new CanPostRatingAndCommentParam();

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
	public static Name = 'CanPostRatingAndComment';

	private result = new CanPostRatingAndCommentResult();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.result.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			result: this.result
		};
	}
}
