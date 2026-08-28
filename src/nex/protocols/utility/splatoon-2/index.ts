import RMCMessage from '@/nex/rmc-message';
import UtilityProtocol from '@/nex/protocols/utility';
import * as Methods from '@/nex/protocols/utility/splatoon-2/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class UtilityProtocolSplatoon2 {
	static ID = 0x6E;
	static Name = 'Utility (Splatoon 2)';

	static Methods = {
		AcquireTagId: 0x9,
		UpdateCurrentUser: 0xA
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x9: UtilityProtocolSplatoon2.AcquireTagId,
		0xA: UtilityProtocolSplatoon2.UpdateCurrentUser
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = UtilityProtocolSplatoon2.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			UtilityProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static AcquireTagId(message: RMCMessage): typeof Methods.AcquireTagId.Request | typeof Methods.AcquireTagId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AcquireTagId.Request;
		} else {
			return Methods.AcquireTagId.Response;
		}
	}

	private static UpdateCurrentUser(message: RMCMessage): typeof Methods.UpdateCurrentUser.Request | typeof Methods.UpdateCurrentUser.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateCurrentUser.Request;
		} else {
			return Methods.UpdateCurrentUser.Response;
		}
	}
}
