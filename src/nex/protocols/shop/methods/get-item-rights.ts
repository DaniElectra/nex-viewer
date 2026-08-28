import NEXByteStream from '@/nex/byte-stream';
import QBuffer from '@/nex/types/qbuffer';
import List from '@/nex/types/list';
import ShopItemRights from '@/nex/protocols/shop/types/shop-item-rights';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetItemRights';

	private ticketEnvelope = new QBuffer();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.ticketEnvelope.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			ticketEnvelope: this.ticketEnvelope
		};
	}
}

export class Response {
	public static Name = 'GetItemRights';

	private pItemRights = new List(new ShopItemRights());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pItemRights.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pItemRights: this.pItemRights
		};
	}
}
