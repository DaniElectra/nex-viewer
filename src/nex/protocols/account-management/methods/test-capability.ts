import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'TestCapability';

	private uiCapability = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uiCapability.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiCapability: this.uiCapability
		};
	}
}

export class Response {
	public static Name = 'TestCapability';

	private retval = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.retval.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			retval: this.retval
		};
	}
}
