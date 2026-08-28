import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UpdateMiiClothesParam from '@/nex/protocols/datastore/super-mario-maker-2/types/update-mii-clothes-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateMiiClothes';

	private param = new List(new UpdateMiiClothesParam());

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
	public static Name = 'UpdateMiiClothes';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
