import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import DataStoreRatingTarget from '@/nex/protocols/datastore/types/datastore-rating-target';
import DataStoreRateObjectParam from '@/nex/protocols/datastore/types/datastore-rate-object-param';
import DataStorePreparePostParam from '@/nex/protocols/datastore/types/datastore-prepare-post-param';
import DataStoreRatingInfo from '@/nex/protocols/datastore/types/datastore-rating-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RateObjectWithPosting';

	private target = new DataStoreRatingTarget();
	private rateParam = new DataStoreRateObjectParam();
	private postParam = new DataStorePreparePostParam();
	private fetchRatings = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.target.extractFrom(stream);
		this.rateParam.extractFrom(stream);
		this.postParam.extractFrom(stream);
		this.fetchRatings.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			target: this.target,
			rateParam: this.rateParam,
			postParam: this.postParam,
			fetchRatings: this.fetchRatings
		};
	}
}

export class Response {
	public static Name = 'RateObjectWithPosting';

	private pRating = new DataStoreRatingInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pRating.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pRating: this.pRating
		};
	}
}
