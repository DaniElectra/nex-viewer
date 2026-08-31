import RMCMessage from '@/nex/rmc-message';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import * as Methods from '@/nex/protocols/matchmake-extension/mario-kart-8/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class MatchmakeExtensionProtocolMarioKart8 {
	static ID = 0x6D;
	static Name = 'MatchmakeExtension (Mario Kart 8)';

	static Methods = {
		CreateSimpleSearchObject: 0x24,
		UpdateSimpleSearchObject: 0x25,
		DeleteSimpleSearchObject: 0x26,
		SearchSimpleSearchObject: 0x27,
		JoinMatchmakeSessionWithExtraParticipants: 0x28,
		SearchSimpleSearchObjectByObjectIds: 0x29
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x24: MatchmakeExtensionProtocolMarioKart8.CreateSimpleSearchObject,
		0x25: MatchmakeExtensionProtocolMarioKart8.UpdateSimpleSearchObject,
		0x26: MatchmakeExtensionProtocolMarioKart8.DeleteSimpleSearchObject,
		0x27: MatchmakeExtensionProtocolMarioKart8.SearchSimpleSearchObject,
		0x28: MatchmakeExtensionProtocolMarioKart8.JoinMatchmakeSessionWithExtraParticipants,
		0x29: MatchmakeExtensionProtocolMarioKart8.SearchSimpleSearchObjectByObjectIds
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeExtensionProtocolMarioKart8.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			MatchmakeExtensionProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static CreateSimpleSearchObject(message: RMCMessage): typeof Methods.CreateSimpleSearchObject.Request | typeof Methods.CreateSimpleSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CreateSimpleSearchObject.Request;
		} else {
			return Methods.CreateSimpleSearchObject.Response;
		}
	}

	private static UpdateSimpleSearchObject(message: RMCMessage): typeof Methods.UpdateSimpleSearchObject.Request | typeof Methods.UpdateSimpleSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateSimpleSearchObject.Request;
		} else {
			return Methods.UpdateSimpleSearchObject.Response;
		}
	}

	private static DeleteSimpleSearchObject(message: RMCMessage): typeof Methods.DeleteSimpleSearchObject.Request | typeof Methods.DeleteSimpleSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteSimpleSearchObject.Request;
		} else {
			return Methods.DeleteSimpleSearchObject.Response;
		}
	}

	private static SearchSimpleSearchObject(message: RMCMessage): typeof Methods.SearchSimpleSearchObject.Request | typeof Methods.SearchSimpleSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchSimpleSearchObject.Request;
		} else {
			return Methods.SearchSimpleSearchObject.Response;
		}
	}

	private static JoinMatchmakeSessionWithExtraParticipants(message: RMCMessage): typeof Methods.JoinMatchmakeSessionWithExtraParticipants.Request | typeof Methods.JoinMatchmakeSessionWithExtraParticipants.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.JoinMatchmakeSessionWithExtraParticipants.Request;
		} else {
			return Methods.JoinMatchmakeSessionWithExtraParticipants.Response;
		}
	}

	private static SearchSimpleSearchObjectByObjectIds(message: RMCMessage): typeof Methods.SearchSimpleSearchObjectByObjectIds.Request | typeof Methods.SearchSimpleSearchObjectByObjectIds.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchSimpleSearchObjectByObjectIds.Request;
		} else {
			return Methods.SearchSimpleSearchObjectByObjectIds.Response;
		}
	}
}
