import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import Bool from '@/nex/types/bool';
import QResult from '@/nex/types/qresult';
import DataStoreRatingTarget from '@/nex/protocols/datastore/types/datastore-rating-target';
import DataStoreRateObjectParam from '@/nex/protocols/datastore/types/datastore-rate-object-param';
import DataStorePreparePostParam from '@/nex/protocols/datastore/types/datastore-prepare-post-param';
import DataStoreRatingInfo from '@/nex/protocols/datastore/types/datastore-rating-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RateObjectsWithPosting';

	private target = new List(new DataStoreRatingTarget());
	private rateParam = new List(new DataStoreRateObjectParam());
	private postParam = new List(new DataStorePreparePostParam());
	private transactional = new Bool();
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
			targets: this.target,
			rateParams: this.rateParam,
			postParams: this.postParam,
			transactional: this.transactional,
			fetchRatings: this.fetchRatings
		};
	}
}

export class Response {
	public static Name = 'RateObjectsWithPosting';

	private pRatings = new List(new DataStoreRatingInfo());
	private pResults = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pRatings.extractFrom(stream);
		this.pResults.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pRatings: this.pRatings,
			pResults: this.pResults
		};
	}
}
