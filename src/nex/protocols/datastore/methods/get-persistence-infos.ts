import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import List from '@/nex/types/list';
import UInt16 from '@/nex/types/uint16';
import QResult from '@/nex/types/qresult';
import DataStorePersistenceInfo from '@/nex/protocols/datastore/types/datastore-persistence-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetPersistenceInfos';

	private ownerId = new PID();
	private persistenceSlotIds = new List(new UInt16());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.ownerId.extractFrom(stream);
		this.persistenceSlotIds.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			ownerId: this.ownerId,
			persistenceSlotIds: this.persistenceSlotIds
		};
	}
}

export class Response {
	public static Name = 'GetPersistenceInfos';

	private pPersistenceInfo = new List(new DataStorePersistenceInfo());
	private pResults = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pPersistenceInfo.extractFrom(stream);
		this.pResults.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pPersistenceInfo: this.pPersistenceInfo,
			pResults: this.pResults
		};
	}
}
