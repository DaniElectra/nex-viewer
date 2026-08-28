import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/persistent-store/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class PersistentStoreProtocol {
	static ID = 0x18;
	static Name = 'PersistentStore';

	static Methods = {
		FindByGroup: 0x1,
		InsertItem: 0x2,
		RemoveItem: 0x3,
		GetItem: 0x4,
		InsertCustomItem: 0x5,
		GetCustomItem: 0x6,
		FindItemsBySQLQuery: 0x7
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: PersistentStoreProtocol.FindByGroup,
		0x2: PersistentStoreProtocol.InsertItem,
		0x3: PersistentStoreProtocol.RemoveItem,
		0x4: PersistentStoreProtocol.GetItem,
		0x5: PersistentStoreProtocol.InsertCustomItem,
		0x6: PersistentStoreProtocol.GetCustomItem,
		0x7: PersistentStoreProtocol.FindItemsBySQLQuery
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = PersistentStoreProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static FindByGroup(message: RMCMessage): typeof Methods.FindByGroup.Request | typeof Methods.FindByGroup.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindByGroup.Request;
		} else {
			return Methods.FindByGroup.Response;
		}
	}

	private static InsertItem(message: RMCMessage): typeof Methods.InsertItem.Request | typeof Methods.InsertItem.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.InsertItem.Request;
		} else {
			return Methods.InsertItem.Response;
		}
	}

	private static RemoveItem(message: RMCMessage): typeof Methods.RemoveItem.Request | typeof Methods.RemoveItem.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RemoveItem.Request;
		} else {
			return Methods.RemoveItem.Response;
		}
	}

	private static GetItem(message: RMCMessage): typeof Methods.GetItem.Request | typeof Methods.GetItem.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetItem.Request;
		} else {
			return Methods.GetItem.Response;
		}
	}

	private static InsertCustomItem(message: RMCMessage): typeof Methods.InsertCustomItem.Request | typeof Methods.InsertCustomItem.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.InsertCustomItem.Request;
		} else {
			return Methods.InsertCustomItem.Response;
		}
	}

	private static GetCustomItem(message: RMCMessage): typeof Methods.GetCustomItem.Request | typeof Methods.GetCustomItem.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCustomItem.Request;
		} else {
			return Methods.GetCustomItem.Response;
		}
	}

	private static FindItemsBySQLQuery(message: RMCMessage): typeof Methods.FindItemsBySQLQuery.Request | typeof Methods.FindItemsBySQLQuery.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindItemsBySQLQuery.Request;
		} else {
			return Methods.FindItemsBySQLQuery.Response;
		}
	}
}
