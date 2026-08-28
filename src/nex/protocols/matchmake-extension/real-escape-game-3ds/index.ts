import RMCMessage from '@/nex/rmc-message';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import * as Methods from '@/nex/protocols/matchmake-extension/real-escape-game-3ds/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class MatchmakeExtensionProtocolRealEscapeGame3DS {
	static ID = 0x6D;
	static Name = 'MatchmakeExtension (Real Escape Game 3DS)';

	static Methods = {
		GetCustomMatchmakeConfig: 0x2D,
		GetNumberOfMatchmakeSessions: 0x2E,
		GetNumberOfMatchmakeSessionsWithGameModes: 0x2F
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x2D: MatchmakeExtensionProtocolRealEscapeGame3DS.GetCustomMatchmakeConfig,
		0x2E: MatchmakeExtensionProtocolRealEscapeGame3DS.GetNumberOfMatchmakeSessions,
		0x2F: MatchmakeExtensionProtocolRealEscapeGame3DS.GetNumberOfMatchmakeSessionsWithGameModes
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeExtensionProtocolRealEscapeGame3DS.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			MatchmakeExtensionProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static GetCustomMatchmakeConfig(message: RMCMessage): typeof Methods.GetCustomMatchmakeConfig.Request | typeof Methods.GetCustomMatchmakeConfig.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCustomMatchmakeConfig.Request;
		} else {
			return Methods.GetCustomMatchmakeConfig.Response;
		}
	}

	private static GetNumberOfMatchmakeSessions(message: RMCMessage): typeof Methods.GetNumberOfMatchmakeSessions.Request | typeof Methods.GetNumberOfMatchmakeSessions.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetNumberOfMatchmakeSessions.Request;
		} else {
			return Methods.GetNumberOfMatchmakeSessions.Response;
		}
	}

	private static GetNumberOfMatchmakeSessionsWithGameModes(message: RMCMessage): typeof Methods.GetNumberOfMatchmakeSessionsWithGameModes.Request | typeof Methods.GetNumberOfMatchmakeSessionsWithGameModes.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetNumberOfMatchmakeSessionsWithGameModes.Request;
		} else {
			return Methods.GetNumberOfMatchmakeSessionsWithGameModes.Response;
		}
	}
}
