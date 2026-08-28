import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import DataStoreCompletePostParamV1 from '@/nex/protocols/datastore/types/datastore-complete-post-param-v1';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CompleteAttachFileV1';

	private param = new DataStoreCompletePostParamV1();

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
	public static Name = 'CompleteAttachFileV1';

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
