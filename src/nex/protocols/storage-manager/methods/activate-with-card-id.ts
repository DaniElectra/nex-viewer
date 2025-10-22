import NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ActivateWithCardId';

	private slot = new UInt8();
	private cardID = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.slot.extractFrom(stream);
		this.cardID.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			slot: this.slot,
			cardID: this.cardID
		};
	}
}

export class Response {
	public static Name = 'ActivateWithCardId';

	private uniqueID = new UInt32();
	private firstTime = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uniqueID.extractFrom(stream);
		this.firstTime.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uniqueID: this.uniqueID,
			firstTime: this.firstTime
		};
	}
}
