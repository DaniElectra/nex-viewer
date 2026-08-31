import NEXByteStream from '@/nex/byte-stream';
import DataStoreAttachFileParam from '@/nex/protocols/datastore/super-mario-maker/types/datastore-attach-file-param';
import DataStoreReqPostInfo from '@/nex/protocols/datastore/types/datastore-req-post-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PrepareAttachFile';

	private param = new DataStoreAttachFileParam();

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
	public static Name = 'PrepareAttachFile';

	private pReqPostInfo = new DataStoreReqPostInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pReqPostInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pReqPostInfo: this.pReqPostInfo
		};
	}
}
