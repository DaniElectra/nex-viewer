import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import QResult from '@/nex/types/qresult';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateAccountEmail';

	private strName = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.strName.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			strName: this.strName
		};
	}
}

export class Response {
	public static Name = 'UpdateAccountEmail';

	private retval = new QResult();

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
