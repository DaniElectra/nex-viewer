import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import UnknownStructure0x17 from '@/nex/protocols/ranking/mario-kart-7/types/unknown-structure-17';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UnknownMethod0x17';

	private numberOfEntries = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.numberOfEntries.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			numberOfEntries: this.numberOfEntries
		};
	}
}

export class Response {
	public static Name = 'UnknownMethod0x17';

	private entries = new List(new UnknownStructure0x17());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.entries.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			entries: this.entries
		};
	}
}
