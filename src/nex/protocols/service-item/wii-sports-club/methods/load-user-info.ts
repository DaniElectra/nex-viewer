import NEXByteStream from '@/nex/byte-stream';
import ServiceItemUserInfo from '@/nex/protocols/service-item/wii-sports-club/types/service-item-user-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'LoadUserInfo';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'LoadUserInfo';

	private userInfo = new ServiceItemUserInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.userInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			userInfo: this.userInfo
		};
	}
}
