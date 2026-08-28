import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import CoconutMeta from '@/nex/protocols/datastore/splatoon-2/types/coconut-meta';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CoconutRegisterMeta';

	private meta = new CoconutMeta();
	private url = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.meta.extractFrom(stream);
		this.url.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			meta: this.meta,
			url: this.url
		};
	}
}

// * No response data
export class Response {
	public static Name = 'CoconutRegisterMeta';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
