import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import CoconutMeta from '@/nex/protocols/datastore/splatoon-2/types/coconut-meta';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CoconutRegisterMetaByParam';

	private meta = new CoconutMeta();
	private snsName = new RVString();
	private postId = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.meta.extractFrom(stream);
		this.snsName.extractFrom(stream);
		this.postId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			meta: this.meta,
			snsName: this.snsName,
			postId: this.postId
		};
	}
}

// * No response data
export class Response {
	public static Name = 'CoconutRegisterMetaByParam';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
