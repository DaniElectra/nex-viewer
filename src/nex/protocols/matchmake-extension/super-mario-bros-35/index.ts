import RMCMessage from '@/nex/rmc-message';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import * as Methods from '@/nex/protocols/matchmake-extension/super-mario-bros-35/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class MatchmakeExtensionProtocolSuperMarioBros35 {
	static ID = 0x6D;
	static Name = 'MatchmakeExtension (Super Mario Bros. 35)';

	static Methods = {
		ResetGameSession: 0x37
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x37: MatchmakeExtensionProtocolSuperMarioBros35.ResetGameSession
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeExtensionProtocolSuperMarioBros35.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			MatchmakeExtensionProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static ResetGameSession(message: RMCMessage): typeof Methods.ResetGameSession.Request | typeof Methods.ResetGameSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ResetGameSession.Request;
		} else {
			return Methods.ResetGameSession.Response;
		}
	}
}
