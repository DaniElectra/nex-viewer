import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import SimpleSearchObject from '@/nex/protocols/matchmake-extension/mario-kart-8-deluxe/types/simple-search-object';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateSimpleSearchObject';

	private objectID = new UInt32();
	private newObject = new SimpleSearchObject();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.objectID.extractFrom(stream);
		this.newObject.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			objectID: this.objectID,
			newObject: this.newObject
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateSimpleSearchObject';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
