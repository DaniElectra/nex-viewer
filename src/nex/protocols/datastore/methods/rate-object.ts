import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import DataStoreRatingTarget from '@/nex/protocols/datastore/types/datastore-rating-target';
import DataStoreRateObjectParam from '@/nex/protocols/datastore/types/datastore-rate-object-param';
import DataStoreRatingInfo from '@/nex/protocols/datastore/types/datastore-rating-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RateObject';

	private target = new DataStoreRatingTarget();
	private param = new DataStoreRateObjectParam();
	private fetchRatings = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.target.extractFrom(stream);
		this.param.extractFrom(stream);
		this.fetchRatings.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			target: this.target,
			param: this.param,
			fetchRatings: this.fetchRatings
		};
	}
}

export class Response {
	public static Name = 'RateObject';

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
