import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RequestMigration';

	private oneTimePassword = new RVString();
	private boxes = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.oneTimePassword.extractFrom(stream);
		this.boxes.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			oneTimePassword: this.oneTimePassword,
			boxes: this.boxes
		};
	}
}

export class Response {
	public static Name = 'RequestMigration';

	private detailCode = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.detailCode.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			detailCode: this.detailCode
		};
	}
}
