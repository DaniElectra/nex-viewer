import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import DataStorePostFightingPowerScoreParam from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-post-fighting-power-score-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PostFightingPowerScore';

	private params = new List(new DataStorePostFightingPowerScoreParam());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.params.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			params: this.params
		};
	}
}

// * No response data
export class Response {
	public static Name = 'PostFightingPowerScore';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
