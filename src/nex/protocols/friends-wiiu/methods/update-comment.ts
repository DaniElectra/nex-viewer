import NEXByteStream from '@/nex/byte-stream';
import Comment from '@/nex/protocols/friends-wiiu/types/comment';
import DateTime from '@/nex/types/datetime';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateComment';

	private comment = new Comment();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.comment.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			comment: this.comment
		};
	}
}

export class Response {
	public static Name = 'UpdateComment';

	private updated = new DateTime();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.updated.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			updated: this.updated
		};
	}
}
