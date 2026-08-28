import NEXByteStream from '@/nex/byte-stream';
import InitializeWorldMapProgressParam from '@/nex/protocols/datastore/super-mario-maker-2/types/initialize-world-map-progress-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'InitializeWorldMapProgress';

	private param = new InitializeWorldMapProgressParam();

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
	public static Name = 'InitializeWorldMapProgress';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
