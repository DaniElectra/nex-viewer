import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import DataStoreRatingTarget from '@/nex/protocols/datastore/types/datastore-rating-target';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ResetRating';

	private target = new DataStoreRatingTarget();
	private updatePassword = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.target.extractFrom(stream);
		this.updatePassword.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			target: this.target,
			updatePassword: this.updatePassword
		};
	}
}

// * No response data
export class Response {
	public static Name = 'ResetRating';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
