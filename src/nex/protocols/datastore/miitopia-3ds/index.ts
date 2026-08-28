import RMCMessage from '@/nex/rmc-message';
import DataStoreProtocol from '@/nex/protocols/datastore';
import * as Methods from '@/nex/protocols/datastore/miitopia-3ds/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class DataStoreProtocolMiitopia3DS {
	static ID = 0x73;
	static Name = 'DataStore (Miitopia 3DS)';

	static Methods = {
		SearchMii: 0x2F
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x2F: DataStoreProtocolMiitopia3DS.SearchMii
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = DataStoreProtocolMiitopia3DS.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			DataStoreProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static SearchMii(message: RMCMessage): typeof Methods.SearchMii.Request | typeof Methods.SearchMii.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchMii.Request;
		} else {
			return Methods.SearchMii.Response;
		}
	}
}
