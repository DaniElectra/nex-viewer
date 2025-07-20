import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UnknownMethod0x3';

	private parameters: Buffer;

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.parameters = stream.readRest(); // * The structure for this request is unknown, just send show all of this in the UI
	}

	public toJSON(): any {
		return {
			parameters: this.parameters.toString('hex')
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UnknownMethod0x3';

	private unknown = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown: this.unknown
		};
	}
}
