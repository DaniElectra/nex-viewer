import NEXByteStream from '@/nex/byte-stream';
import OrderedInfo from '@/nex/protocols/datastore/splatoon-2/types/ordered-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PurchaseGear';

	private info = new OrderedInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.info.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			info: this.info
		};
	}
}

// * No response data
export class Response {
	public static Name = 'PurchaseGear';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
