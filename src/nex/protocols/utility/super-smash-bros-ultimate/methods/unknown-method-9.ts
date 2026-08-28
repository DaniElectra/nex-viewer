import NEXByteStream from '@/nex/byte-stream';
import MethodParam9 from '@/nex/protocols/utility/super-smash-bros-ultimate/types/method-param9';
import UnknownStruct from '@/nex/protocols/utility/super-smash-bros-ultimate/types/unknown-struct';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UnknownMethod0x9';

	private param = new MethodParam9();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param
		};
	}
}

export class Response {
	public static Name = 'UnknownMethod0x9';

	private unknown = new UnknownStruct();

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
