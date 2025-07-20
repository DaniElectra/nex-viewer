import NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AcquireNexUniqueId';

	private slot = new UInt8();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.slot.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			slot: this.slot
		};
	}
}

export class Response {
	public static Name = 'AcquireNexUniqueId';

	private cardID = new UInt32();
	private firstTime = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.cardID.extractFrom(stream);
		this.firstTime.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			cardID: this.cardID,
			firstTime: this.firstTime
		};
	}
}
