import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import QBuffer from '@/nex/types/qbuffer';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetRivToken';

	private itemCode = new RVString();
	private referenceId = new QBuffer();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.itemCode.extractFrom(stream);
		this.referenceId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			itemCode: this.itemCode,
			referenceId: this.referenceId
		};
	}
}

export class Response {
	public static Name = 'GetRivToken';

	private pRivToken = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pRivToken.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pRivToken: this.pRivToken
		};
	}
}
