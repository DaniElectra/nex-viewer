import RMCMessage from '@/nex/rmc-message';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import * as Methods from '@/nex/protocols/matchmake-extension/super-smash-bros-ultimate/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class MatchmakeExtensionProtocolSuperSmashBrosUltimate {
	static ID = 0x6D;
	static Name = 'MatchmakeExtension (Super Smash Bros. Ultimate)';

	static Methods = {
		UnknownMethod0x36: 0x36,
		UnknownMethod0x37: 0x37,
		UnknownMethod0x38: 0x38,
		UnknownMethod0x39: 0x39,
		UnknownMethod0x3A: 0x3A,
		UnknownMethod0x3B: 0x3B
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x36: MatchmakeExtensionProtocolSuperSmashBrosUltimate.UnknownMethod0x36,
		0x37: MatchmakeExtensionProtocolSuperSmashBrosUltimate.UnknownMethod0x37,
		0x38: MatchmakeExtensionProtocolSuperSmashBrosUltimate.UnknownMethod0x38,
		0x39: MatchmakeExtensionProtocolSuperSmashBrosUltimate.UnknownMethod0x39,
		0x3A: MatchmakeExtensionProtocolSuperSmashBrosUltimate.UnknownMethod0x3A,
		0x3B: MatchmakeExtensionProtocolSuperSmashBrosUltimate.UnknownMethod0x3B
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeExtensionProtocolSuperSmashBrosUltimate.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			MatchmakeExtensionProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static UnknownMethod0x36(message: RMCMessage): typeof Methods.UnknownMethod0x36.Request | typeof Methods.UnknownMethod0x36.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x36.Request;
		} else {
			return Methods.UnknownMethod0x36.Response;
		}
	}

	private static UnknownMethod0x37(message: RMCMessage): typeof Methods.UnknownMethod0x37.Request | typeof Methods.UnknownMethod0x37.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x37.Request;
		} else {
			return Methods.UnknownMethod0x37.Response;
		}
	}

	private static UnknownMethod0x38(message: RMCMessage): typeof Methods.UnknownMethod0x38.Request | typeof Methods.UnknownMethod0x38.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x38.Request;
		} else {
			return Methods.UnknownMethod0x38.Response;
		}
	}

	private static UnknownMethod0x39(message: RMCMessage): typeof Methods.UnknownMethod0x39.Request | typeof Methods.UnknownMethod0x39.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x39.Request;
		} else {
			return Methods.UnknownMethod0x39.Response;
		}
	}

	private static UnknownMethod0x3A(message: RMCMessage): typeof Methods.UnknownMethod0x3A.Request | typeof Methods.UnknownMethod0x3A.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x3A.Request;
		} else {
			return Methods.UnknownMethod0x3A.Response;
		}
	}

	private static UnknownMethod0x3B(message: RMCMessage): typeof Methods.UnknownMethod0x3B.Request | typeof Methods.UnknownMethod0x3B.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x3B.Request;
		} else {
			return Methods.UnknownMethod0x3B.Response;
		}
	}
}
