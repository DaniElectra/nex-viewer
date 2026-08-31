import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import ShopRequestInfo from '@/nex/protocols/datastore/real-escape-game-3ds/types/shop-request-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetShopRequestInfo';

	private applicationId = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.applicationId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			applicationId: this.applicationId
		};
	}
}

export class Response {
	public static Name = 'GetShopRequestInfo';

	private pInfo = new ShopRequestInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pInfo: this.pInfo
		};
	}
}
