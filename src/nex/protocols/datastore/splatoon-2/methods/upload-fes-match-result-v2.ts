import NEXByteStream from '@/nex/byte-stream';
import CalicoFesStatsV2 from '@/nex/protocols/datastore/splatoon-2/types/calico-fes-stats-v2';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UploadFesMatchResultV2';

	private stats = new CalicoFesStatsV2();

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
	public static Name = 'UploadFesMatchResultV2';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
