import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import MiiClothes from '@/nex/protocols/datastore/super-mario-maker-2/types/mii-clothes';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetMiiClothes';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetMiiClothes';

	private miiClothes = new List(new MiiClothes());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.miiClothes.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			miiClothes: this.miiClothes
		};
	}
}
