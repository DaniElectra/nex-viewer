import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'Hello';

	private name = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.name.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			name: this.name
		};
	}
}

export class Response {
	public static Name = 'Hello';

	private str = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.str.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			str: this.str
		};
	}
}
