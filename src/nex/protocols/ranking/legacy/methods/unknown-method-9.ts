import NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UnknownMethod0x9';

	private unknown1 = new UInt32();
	private unknown2 = new UInt32();
	private unknown3 = new List(new UInt32());
	private unknown4 = new List(new UInt8());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.unknown4.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown1: this.unknown1,
			unknown2: this.unknown2,
			unknown3: this.unknown3,
			unknown4: this.unknown4
		};
	}
}

export class Response {
	public static Name = 'UnknownMethod0x9';

	private parameters: Buffer;

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.parameters = stream.readRest(); // * The structure for this response is unknown, just show all of this in the UI
	}

	public toJSON(): any {
		return {
			parameters: this.parameters.toString('hex')
		};
	}
}
