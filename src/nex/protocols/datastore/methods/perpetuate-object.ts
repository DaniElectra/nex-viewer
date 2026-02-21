import NEXByteStream from '@/nex/byte-stream';
import UInt16 from '@/nex/types/uint16';
import UInt64 from '@/nex/types/uint64';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PerpetuateObject';

	private persistenceSlotId = new UInt16();
	private dataId = new UInt64();
	private deleteLastObject = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.persistenceSlotId.extractFrom(stream);
		this.dataId.extractFrom(stream);
		this.deleteLastObject.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			persistenceSlotId: this.persistenceSlotId,
			dataId: this.dataId,
			deleteLastObject: this.deleteLastObject
		};
	}
}

// * No response data
export class Response {
	public static Name = 'PerpetuateObject';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
