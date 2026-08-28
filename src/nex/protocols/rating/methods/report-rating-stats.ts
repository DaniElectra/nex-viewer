import NEXByteStream from '@/nex/byte-stream';
import RatingSessionToken from '@/nex/protocols/rating/types/rating-session-token';
import List from '@/nex/types/list';
import RatingStats from '@/nex/protocols/rating/types/rating-stats';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ReportRatingStats';

	private sessionToken = new RatingSessionToken();
	private stats = new List(new RatingStats());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.sessionToken.extractFrom(stream);
		this.stats.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			sessionToken: this.sessionToken,
			stats: this.stats
		};
	}
}

// * No response data
export class Response {
	public static Name = 'ReportRatingStats';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
