import NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';
import UInt16 from '@/nex/types/uint16';
import UInt32 from '@/nex/types/uint32';
import Int16 from '@/nex/types/int16';
import Bool from '@/nex/types/bool';
import List from '@/nex/types/list';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UnknownMethod0x13';

	private unknown1 = new UInt32();
	private unknown2 = new UInt32();
	private unknown3 = new List(new UInt32());
	private unknown4 = new List(new UInt8());
	private unknown5 = new Bool();
	private unknown6 = new UInt16();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.unknown4.extractFrom(stream);
		this.unknown5.extractFrom(stream);
		this.unknown6.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown1: this.unknown1,
			unknown2: this.unknown2,
			unknown3: this.unknown3,
			unknown4: this.unknown4,
			unknown5: this.unknown5,
			unknown6: this.unknown6
		};
	}
}

export class Response {
	public static Name = 'UnknownMethod0x13';

	private resultCode = new Int16();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.resultCode.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			resultCode: this.resultCode
		};
	}
}
