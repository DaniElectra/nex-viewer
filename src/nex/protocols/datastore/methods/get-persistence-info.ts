import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import UInt16 from '@/nex/types/uint16';
import DataStorePersistenceInfo from '@/nex/protocols/datastore/types/datastore-persistence-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetPersistenceInfo';

	private ownerId = new PID();
	private persistenceSlotId = new UInt16();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.ownerId.extractFrom(stream);
		this.persistenceSlotId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			ownerId: this.ownerId,
			persistenceSlotId: this.persistenceSlotId
		};
	}
}

export class Response {
	public static Name = 'GetPersistenceInfo';

	private pPersistenceInfo = new DataStorePersistenceInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pPersistenceInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pPersistenceInfo: this.pPersistenceInfo
		};
	}
}
