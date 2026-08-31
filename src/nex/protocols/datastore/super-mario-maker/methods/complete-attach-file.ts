import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import DataStoreCompletePostParam from '@/nex/protocols/datastore/types/datastore-complete-post-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CompleteAttachFile';

	private param = new DataStoreCompletePostParam();

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
	public static Name = 'CompleteAttachFile';

	private pUrl = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pUrl.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pUrl: this.pUrl
		};
	}
}
