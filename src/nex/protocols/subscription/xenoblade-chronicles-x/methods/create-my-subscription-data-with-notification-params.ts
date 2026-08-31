import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import SubscriptionData from '@/nex/protocols/subscription/types/subscription-data';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CreateMySubscriptionDataWithNotificationParams';

	private unknown1 = new UInt32();
	private param = new SubscriptionData();
	private unknown2 = new UInt32();
	private unknown3 = new UInt32();
	private unknown4 = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown1.extractFrom(stream);
		this.param.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.unknown4.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown1: this.unknown1,
			param: this.param,
			unknown2: this.unknown2,
			unknown3: this.unknown3,
			unknown4: this.unknown4
		};
	}
}

// * No response data
export class Response {
	public static Name = 'CreateMySubscriptionDataWithNotificationParams';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
