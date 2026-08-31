import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import UnknownStruct from '@/nex/protocols/matchmake-extension/mario-kart-8-deluxe/types/unknown-struct';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UnknownMethod0x45';

	private request = new UnknownStruct();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.request.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			request: this.request
		};
	}
}

export class Response {
	public static Name = 'UnknownMethod0x45';

	private unknown = new UInt32();

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
