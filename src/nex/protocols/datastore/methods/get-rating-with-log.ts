import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import DataStoreRatingTarget from '@/nex/protocols/datastore/types/datastore-rating-target';
import DataStoreRatingInfo from '@/nex/protocols/datastore/types/datastore-rating-info';
import DataStoreRatingLog from '@/nex/protocols/datastore/types/datastore-rating-log';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetRatingWithLog';

	private target = new DataStoreRatingTarget();
	private accessPassword = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.target.extractFrom(stream);
		this.accessPassword.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			target: this.target,
			accessPassword: this.accessPassword
		};
	}
}

export class Response {
	public static Name = 'GetRatingWithLog';

	private pRating = new DataStoreRatingInfo();
	private pRatingLog = new DataStoreRatingLog();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pRating.extractFrom(stream);
		this.pRatingLog.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pRating: this.pRating,
			pRatingLog: this.pRatingLog
		};
	}
}
