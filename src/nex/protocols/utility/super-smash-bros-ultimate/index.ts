import RMCMessage from '@/nex/rmc-message';
import UtilityProtocol from '@/nex/protocols/utility';
import * as Methods from '@/nex/protocols/utility/super-smash-bros-ultimate/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class UtilityProtocolSuperSmashBrosUltimate {
	static ID = 0x6E;
	static Name = 'Utility (Super Smash Bros. Ultimate)';

	static Methods = {
		UnknownMethod0x9: 0x9,
		UnknownMethod0xA: 0xA,
		GetGameEvents: 0xB
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x9: UtilityProtocolSuperSmashBrosUltimate.UnknownMethod0x9,
		0xA: UtilityProtocolSuperSmashBrosUltimate.UnknownMethod0xA,
		0xB: UtilityProtocolSuperSmashBrosUltimate.GetGameEvents
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = UtilityProtocolSuperSmashBrosUltimate.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			UtilityProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static UnknownMethod0x9(message: RMCMessage): typeof Methods.UnknownMethod0x9.Request | typeof Methods.UnknownMethod0x9.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x9.Request;
		} else {
			return Methods.UnknownMethod0x9.Response;
		}
	}

	private static UnknownMethod0xA(message: RMCMessage): typeof Methods.UnknownMethod0xA.Request | typeof Methods.UnknownMethod0xA.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0xA.Request;
		} else {
			return Methods.UnknownMethod0xA.Response;
		}
	}

	private static GetGameEvents(message: RMCMessage): typeof Methods.GetGameEvents.Request | typeof Methods.GetGameEvents.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetGameEvents.Request;
		} else {
			return Methods.GetGameEvents.Response;
		}
	}
}
