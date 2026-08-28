import NEXByteStream from '@/nex/byte-stream';
import MethodParam10 from '@/nex/protocols/utility/super-smash-bros-ultimate/types/method-param10';
import UnknownStruct2 from '@/nex/protocols/utility/super-smash-bros-ultimate/types/unknown-struct2';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UnknownMethod0xA';

	private param = new MethodParam10();

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
	public static Name = 'UnknownMethod0xA';

	private param = new UnknownStruct2();

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
