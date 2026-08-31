import NEXByteStream from '@/nex/byte-stream';
import UInt16 from '@/nex/types/uint16';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UnperpetuateObject';

	private persistenceSlotId = new UInt16();
	private deleteLastObject = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.persistenceSlotId.extractFrom(stream);
		this.deleteLastObject.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			persistenceSlotId: this.persistenceSlotId,
			deleteLastObject: this.deleteLastObject
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UnperpetuateObject';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
