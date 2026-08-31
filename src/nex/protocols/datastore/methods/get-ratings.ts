import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import QResult from '@/nex/types/qresult';
import DataStoreRatingInfoWithSlot from '@/nex/protocols/datastore/types/datastore-rating-info-with-slot';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetRatings';

	private dataIds = new List(new UInt64());
	private accessPassword = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.dataIds.extractFrom(stream);
		this.accessPassword.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dataIds: this.dataIds,
			accessPassword: this.accessPassword
		};
	}
}

export class Response {
	public static Name = 'GetRatings';

	private pRatings = new List(new List(new DataStoreRatingInfoWithSlot()));
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
