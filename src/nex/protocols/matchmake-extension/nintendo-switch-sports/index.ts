import RMCMessage from '@/nex/rmc-message';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import * as Methods from '@/nex/protocols/matchmake-extension/nintendo-switch-sports/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class MatchmakeExtensionProtocolNintendoSwitchSports {
	static ID = 0x6D;
	static Name = 'MatchmakeExtension (Nintendo Switch Sports)';

	static Methods = {
		RegisterAttendant: 0x37,
		RemoveAttendant: 0x38
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x37: MatchmakeExtensionProtocolNintendoSwitchSports.RegisterAttendant,
		0x38: MatchmakeExtensionProtocolNintendoSwitchSports.RemoveAttendant
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeExtensionProtocolNintendoSwitchSports.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			MatchmakeExtensionProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static RegisterAttendant(message: RMCMessage): typeof Methods.RegisterAttendant.Request | typeof Methods.RegisterAttendant.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RegisterAttendant.Request;
		} else {
			return Methods.RegisterAttendant.Response;
		}
	}

	private static RemoveAttendant(message: RMCMessage): typeof Methods.RemoveAttendant.Request | typeof Methods.RemoveAttendant.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RemoveAttendant.Request;
		} else {
			return Methods.RemoveAttendant.Response;
		}
	}
}
