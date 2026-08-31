import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RegisterFavoriteCompetition';

	private objectID = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.objectID.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			objectID: this.objectID
		};
	}
}

// * No response data
export class Response {
	public static Name = 'RegisterFavoriteCompetition';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
