import NEXByteStream from '@/nex/byte-stream';
import CalicoRegularStats from '@/nex/protocols/datastore/splatoon-2/types/calico-regular-stats';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UploadRegularMatchResult';

	private stats = new CalicoRegularStats();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.stats.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			stats: this.stats
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UploadRegularMatchResult';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
