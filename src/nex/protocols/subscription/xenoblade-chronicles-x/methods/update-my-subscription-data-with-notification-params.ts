import NEXByteStream from '@/nex/byte-stream';
import SubscriptionData from '@/nex/protocols/subscription/types/subscription-data';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateMySubscriptionDataWithNotificationParams';

	private param = new SubscriptionData();
	private unknown1 = new UInt32();
	private unknown2 = new UInt32();
	private unknown3 = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param,
			unknown1: this.unknown1,
			unknown2: this.unknown2,
			unknown3: this.unknown3
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateMySubscriptionDataWithNotificationParams';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
