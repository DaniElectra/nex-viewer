import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import DataStoreChangePlayablePlatformParam from '@/nex/protocols/datastore/super-mario-maker/types/datastore-change-playable-platform-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ChangePlayablePlatform';

	private params = new List(new DataStoreChangePlayablePlatformParam());

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
	public static Name = 'ChangePlayablePlatform';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
