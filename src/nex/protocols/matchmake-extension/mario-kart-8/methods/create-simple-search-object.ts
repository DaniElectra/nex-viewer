import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import SimpleSearchObject from '@/nex/protocols/matchmake-extension/mario-kart-8/types/simple-search-object';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CreateSimpleSearchObject';

	private object = new SimpleSearchObject();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.object.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			object: this.object
		};
	}
}

export class Response {
	public static Name = 'CreateSimpleSearchObject';

	private objectID = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.objectID.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			objectID: this.objectID
		};
	}
}
