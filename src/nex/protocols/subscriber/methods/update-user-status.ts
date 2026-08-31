import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import SubscriberUserStatusParam from '@/nex/protocols/subscriber/types/subscriber-user-status-param';
import UInt8 from '@/nex/types/uint8';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateUserStatus';

	private param = new List(new SubscriberUserStatusParam());
	private unknown = new List(new UInt8());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param,
			unknown: this.unknown
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateUserStatus';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
