import UInt32 from '@/nex/types/uint32';
import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import ActivePlayerSubscriptionData from '@/nex/protocols/subscription/types/active-player-subscription-data';
import type RMCMessage from '@/nex/rmc-message';

export class Request {
	public static Name = 'GetActivePlayerSubscriptionData';

	private unknown1 = new UInt32();
	private unknown2 = new UInt32();
	private unknown3 = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown1: this.unknown1,
			unknown2: this.unknown2,
			unknown3: this.unknown3
		};
	}
}

export class Response {
	public static Name = 'GetActivePlayerSubscriptionData';

	private unknown = new List(new ActivePlayerSubscriptionData());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown: this.unknown
		};
	}
}
