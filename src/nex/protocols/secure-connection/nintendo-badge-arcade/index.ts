import RMCMessage from '@/nex/rmc-message';
import SecureConnectionProtocol from '@/nex/protocols/secure-connection';
import * as Methods from '@/nex/protocols/secure-connection/nintendo-badge-arcade/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class SecureConnectionProtocolNintendoBadgeArcade {
	static ID = 0xB;
	static Name = 'SecureConnection (Nintendo Badge Arcade)';

	static Methods = {
		GetMaintenanceStatus: 0x9
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x9: SecureConnectionProtocolNintendoBadgeArcade.GetMaintenanceStatus
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = SecureConnectionProtocolNintendoBadgeArcade.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			SecureConnectionProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static GetMaintenanceStatus(message: RMCMessage): typeof Methods.GetMaintenanceStatus.Request | typeof Methods.GetMaintenanceStatus.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetMaintenanceStatus.Request;
		} else {
			return Methods.GetMaintenanceStatus.Response;
		}
	}
}
