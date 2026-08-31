import RMCMessage from '@/nex/rmc-message';
import DataStoreProtocol from '@/nex/protocols/datastore';
import * as Methods from '@/nex/protocols/datastore/animal-crossing-happy-home-designer/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class DataStoreProtocolAnimalCrossingHappyHomeDesigner {
	static ID = 0x73;
	static Name = 'DataStore (Animal Crossing: Happy Home Designer)';

	static Methods = {
		GetObjectInfos: 0x2D,
		GetMetaByOwnerId: 0x2E,
		GetMetaByUniqueId: 0x2F,
		SearchHouseNew: 0x30,
		SearchHousePopular: 0x31,
		SearchHouseResident: 0x32,
		SearchHouseContest: 0x33,
		SearchHouseContestRandom: 0x34,
		AddToBufferQueue: 0x35,
		GetBufferQueue: 0x36,
		GetBufferQueues: 0x37,
		ClearBufferQueues: 0x38,
		GetContestEntryCount: 0x39
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x2D: DataStoreProtocolAnimalCrossingHappyHomeDesigner.GetObjectInfos,
		0x2E: DataStoreProtocolAnimalCrossingHappyHomeDesigner.GetMetaByOwnerId,
		0x2F: DataStoreProtocolAnimalCrossingHappyHomeDesigner.GetMetaByUniqueId,
		0x30: DataStoreProtocolAnimalCrossingHappyHomeDesigner.SearchHouseNew,
		0x31: DataStoreProtocolAnimalCrossingHappyHomeDesigner.SearchHousePopular,
		0x32: DataStoreProtocolAnimalCrossingHappyHomeDesigner.SearchHouseResident,
		0x33: DataStoreProtocolAnimalCrossingHappyHomeDesigner.SearchHouseContest,
		0x34: DataStoreProtocolAnimalCrossingHappyHomeDesigner.SearchHouseContestRandom,
		0x35: DataStoreProtocolAnimalCrossingHappyHomeDesigner.AddToBufferQueue,
		0x36: DataStoreProtocolAnimalCrossingHappyHomeDesigner.GetBufferQueue,
		0x37: DataStoreProtocolAnimalCrossingHappyHomeDesigner.GetBufferQueues,
		0x38: DataStoreProtocolAnimalCrossingHappyHomeDesigner.ClearBufferQueues,
		0x39: DataStoreProtocolAnimalCrossingHappyHomeDesigner.GetContestEntryCount
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = DataStoreProtocolAnimalCrossingHappyHomeDesigner.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			DataStoreProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static GetObjectInfos(message: RMCMessage): typeof Methods.GetObjectInfos.Request | typeof Methods.GetObjectInfos.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetObjectInfos.Request;
		} else {
			return Methods.GetObjectInfos.Response;
		}
	}

	private static GetMetaByOwnerId(message: RMCMessage): typeof Methods.GetMetaByOwnerId.Request | typeof Methods.GetMetaByOwnerId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetMetaByOwnerId.Request;
		} else {
			return Methods.GetMetaByOwnerId.Response;
		}
	}

	private static GetMetaByUniqueId(message: RMCMessage): typeof Methods.GetMetaByUniqueId.Request | typeof Methods.GetMetaByUniqueId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetMetaByUniqueId.Request;
		} else {
			return Methods.GetMetaByUniqueId.Response;
		}
	}

	private static SearchHouseNew(message: RMCMessage): typeof Methods.SearchHouseNew.Request | typeof Methods.SearchHouseNew.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchHouseNew.Request;
		} else {
			return Methods.SearchHouseNew.Response;
		}
	}

	private static SearchHousePopular(message: RMCMessage): typeof Methods.SearchHousePopular.Request | typeof Methods.SearchHousePopular.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchHousePopular.Request;
		} else {
			return Methods.SearchHousePopular.Response;
		}
	}

	private static SearchHouseResident(message: RMCMessage): typeof Methods.SearchHouseResident.Request | typeof Methods.SearchHouseResident.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchHouseResident.Request;
		} else {
			return Methods.SearchHouseResident.Response;
		}
	}

	private static SearchHouseContest(message: RMCMessage): typeof Methods.SearchHouseContest.Request | typeof Methods.SearchHouseContest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchHouseContest.Request;
		} else {
			return Methods.SearchHouseContest.Response;
		}
	}

	private static SearchHouseContestRandom(message: RMCMessage): typeof Methods.SearchHouseContestRandom.Request | typeof Methods.SearchHouseContestRandom.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchHouseContestRandom.Request;
		} else {
			return Methods.SearchHouseContestRandom.Response;
		}
	}

	private static AddToBufferQueue(message: RMCMessage): typeof Methods.AddToBufferQueue.Request | typeof Methods.AddToBufferQueue.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddToBufferQueue.Request;
		} else {
			return Methods.AddToBufferQueue.Response;
		}
	}

	private static GetBufferQueue(message: RMCMessage): typeof Methods.GetBufferQueue.Request | typeof Methods.GetBufferQueue.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetBufferQueue.Request;
		} else {
			return Methods.GetBufferQueue.Response;
		}
	}

	private static GetBufferQueues(message: RMCMessage): typeof Methods.GetBufferQueues.Request | typeof Methods.GetBufferQueues.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetBufferQueues.Request;
		} else {
			return Methods.GetBufferQueues.Response;
		}
	}

	private static ClearBufferQueues(message: RMCMessage): typeof Methods.ClearBufferQueues.Request | typeof Methods.ClearBufferQueues.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ClearBufferQueues.Request;
		} else {
			return Methods.ClearBufferQueues.Response;
		}
	}

	private static GetContestEntryCount(message: RMCMessage): typeof Methods.GetContestEntryCount.Request | typeof Methods.GetContestEntryCount.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetContestEntryCount.Request;
		} else {
			return Methods.GetContestEntryCount.Response;
		}
	}
}
