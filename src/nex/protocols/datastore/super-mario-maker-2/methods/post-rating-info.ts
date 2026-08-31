import NEXByteStream from '@/nex/byte-stream';
import RatingInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/rating-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PostRatingInfo';

	private ratingInfo = new RatingInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.ratingInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			ratingInfo: this.ratingInfo
		};
	}
}

// * No response data
export class Response {
	public static Name = 'PostRatingInfo';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
