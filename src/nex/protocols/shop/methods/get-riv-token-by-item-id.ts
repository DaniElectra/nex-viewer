import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetRivTokenByItemId';

	private itemId = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.itemId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			itemId: this.itemId
		};
	}
}

export class Response {
	public static Name = 'GetRivTokenByItemId';

	private pRivToken = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pRivToken.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pRivToken: this.pRivToken
		};
	}
}
