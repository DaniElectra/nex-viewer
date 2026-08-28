import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import ShopItem from '@/nex/protocols/shop/types/shop-item';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetItems';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetItems';

	private pItems = new List(new ShopItem());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pItems.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pItems: this.pItems
		};
	}
}
