import NEXByteStream from '@/nex/byte-stream';
import UpdateWorldMapProgressParam from '@/nex/protocols/datastore/super-mario-maker-2/types/update-world-map-progress-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateWorldMapProgress';

	private param = new UpdateWorldMapProgressParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateWorldMapProgress';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
