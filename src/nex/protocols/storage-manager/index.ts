import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/storage-manager/methods';
import type Packet from '@/types/nex/packet';

export default class StorageManagerProtocol {
	// * This protocol is the predecessor of the Utility protocol,
	// * before it was replaced with Utility in NEX 3.0.0. Thus they
	// * share the same protocol ID
	static ID = 0x6E;
	static Name = 'StorageManager';

	static Methods = {
		AcquireNexUniqueId: 0x1,
		NexUniqueIdToPrincipalId: 0x2,
		UnknownMethod0x3: 0x3,
		AcquireCardId: 0x4,
		ActivateWithCardId: 0x5,
		GetAssociatedNexUniqueIdsWithMyPrincipalId: 0x6
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: StorageManagerProtocol.AcquireNexUniqueId,
		0x2: StorageManagerProtocol.NexUniqueIdToPrincipalId,
		0x3: StorageManagerProtocol.UnknownMethod0x3,
		0x4: StorageManagerProtocol.AcquireCardId,
		0x5: StorageManagerProtocol.ActivateWithCardId
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = StorageManagerProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static AcquireNexUniqueId(message: RMCMessage): typeof Methods.AcquireNexUniqueId.Request | typeof Methods.AcquireNexUniqueId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AcquireNexUniqueId.Request;
		} else {
			return Methods.AcquireNexUniqueId.Response;
		}
	}

	private static NexUniqueIdToPrincipalId(message: RMCMessage): typeof Methods.NexUniqueIdToPrincipalId.Request | typeof Methods.NexUniqueIdToPrincipalId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.NexUniqueIdToPrincipalId.Request;
		} else {
			return Methods.NexUniqueIdToPrincipalId.Response;
		}
	}

	private static UnknownMethod0x3(message: RMCMessage): typeof Methods.UnknownMethod0x3.Request | typeof Methods.UnknownMethod0x3.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x3.Request;
		} else {
			return Methods.UnknownMethod0x3.Response;
		}
	}

	private static AcquireCardId(message: RMCMessage): typeof Methods.AcquireCardId.Request | typeof Methods.AcquireCardId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AcquireCardId.Request;
		} else {
			return Methods.AcquireCardId.Response;
		}
	}

	private static ActivateWithCardId(message: RMCMessage): typeof Methods.ActivateWithCardId.Request | typeof Methods.ActivateWithCardId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ActivateWithCardId.Request;
		} else {
			return Methods.ActivateWithCardId.Response;
		}
	}
}
