import NEXByteStream from '@/nex/byte-stream';
import DateTime from '@/nex/types/datetime';
import RVString from '@/nex/types/string';
import RequestPostParam from '@/nex/protocols/datastore/xenoblade-chronicles-x/types/request-post-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'RequestPost_Lazy';

	private param = new RequestPostParam();
	private scheduledTime = new DateTime();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
		this.scheduledTime.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param,
			scheduledTime: this.scheduledTime
		};
	}
}

export class Response {
	public static Name = 'RequestPost_Lazy';

	private unknown = new RVString();

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
