import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'IsOliveCommunityExists';

	private miiverseCommunityIds = new List(new UInt32());
	private unknown = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.miiverseCommunityIds.extractFrom(stream);
		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			miiverseCommunityIds: this.miiverseCommunityIds,
			unknown: this.unknown
		};
	}
}

export class Response {
	public static Name = 'IsOliveCommunityExists';

	private results = new List(new Bool());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.results.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			results: this.results
		};
	}
}
