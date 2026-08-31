import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import SimpleSearchObject from '@/nex/protocols/matchmake-extension/mario-kart-8-deluxe/types/simple-search-object';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchSimpleSearchObjectByObjectIds';

	private objectIDs = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.objectIDs.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			objectIDs: this.objectIDs
		};
	}
}

export class Response {
	public static Name = 'SearchSimpleSearchObjectByObjectIds';

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
