import RMCMessage from '@/nex/rmc-message';
import DataStoreProtocol from '@/nex/protocols/datastore';
import * as Methods from '@/nex/protocols/datastore/super-mario-odyssey/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class DataStoreProtocolSuperMarioOdyssey {
	static ID = 0x73;
	static Name = 'DataStore (Super Mario Odyssey)';

	static Methods = {
		AddToBufferQueue: 0x2F,
		AddToBufferQueues: 0x30,
		GetBufferQueue: 0x31,
		GetBufferQueues: 0x32,
		ClearBufferQueues: 0x33,
		SearchBalloon: 0x34,
		FetchMyInfos: 0x35
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x2F: DataStoreProtocolSuperMarioOdyssey.AddToBufferQueue,
		0x30: DataStoreProtocolSuperMarioOdyssey.AddToBufferQueues,
		0x31: DataStoreProtocolSuperMarioOdyssey.GetBufferQueue,
		0x32: DataStoreProtocolSuperMarioOdyssey.GetBufferQueues,
		0x33: DataStoreProtocolSuperMarioOdyssey.ClearBufferQueues,
		0x34: DataStoreProtocolSuperMarioOdyssey.SearchBalloon,
		0x35: DataStoreProtocolSuperMarioOdyssey.FetchMyInfos
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = DataStoreProtocolSuperMarioOdyssey.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			DataStoreProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static AddToBufferQueue(message: RMCMessage): typeof Methods.AddToBufferQueue.Request | typeof Methods.AddToBufferQueue.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddToBufferQueue.Request;
		} else {
			return Methods.AddToBufferQueue.Response;
		}
	}

	private static AddToBufferQueues(message: RMCMessage): typeof Methods.AddToBufferQueues.Request | typeof Methods.AddToBufferQueues.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddToBufferQueues.Request;
		} else {
			return Methods.AddToBufferQueues.Response;
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

	private static SearchBalloon(message: RMCMessage): typeof Methods.SearchBalloon.Request | typeof Methods.SearchBalloon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchBalloon.Request;
		} else {
			return Methods.SearchBalloon.Response;
		}
	}

	private static FetchMyInfos(message: RMCMessage): typeof Methods.FetchMyInfos.Request | typeof Methods.FetchMyInfos.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FetchMyInfos.Request;
		} else {
			return Methods.FetchMyInfos.Response;
		}
	}
}
