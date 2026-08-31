import NEXByteStream from '@/nex/byte-stream';
import Int8 from '@/nex/types/int8';
import Int32 from '@/nex/types/int32';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RatePeriodicObject';

	private unknown1 = new Int8();
	private unknown2 = new Int8();
	private unknown3 = new Int32();

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
	public static Name = 'RatePeriodicObject';

	private unknown1 = new UInt64();
	private unknown2 = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown1: this.unknown1,
			unknown2: this.unknown2
		};
	}
}
