import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import SimpleSearchParam from '@/nex/protocols/matchmake-extension/mario-kart-8-deluxe/types/simple-search-param';
import SimpleSearchObject from '@/nex/protocols/matchmake-extension/mario-kart-8-deluxe/types/simple-search-object';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchSimpleSearchObject';

	private param = new SimpleSearchParam();

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
	public static Name = 'SearchSimpleSearchObject';

	private objects = new List(new SimpleSearchObject());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.objects.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			objects: this.objects
		};
	}
}
