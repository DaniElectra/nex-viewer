import NEXByteStream from '@/nex/byte-stream';
import CalicoFesStats from '@/nex/protocols/datastore/splatoon-2/types/calico-fes-stats';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UploadFesMatchResult';

	private stats = new CalicoFesStats();

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
	public static Name = 'UploadFesMatchResult';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
