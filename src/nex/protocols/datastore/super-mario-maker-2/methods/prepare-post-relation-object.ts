import NEXByteStream from '@/nex/byte-stream';
import PreparePostRelationObjectParam from '@/nex/protocols/datastore/super-mario-maker-2/types/prepare-post-relation-object-param';
import RelationObjectReqPostInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/relation-object-req-post-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PreparePostRelationObject';

	private info = new PreparePostRelationObjectParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.info.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			info: this.info
		};
	}
}

export class Response {
	public static Name = 'PreparePostRelationObject';

	private param = new RelationObjectReqPostInfo();

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
