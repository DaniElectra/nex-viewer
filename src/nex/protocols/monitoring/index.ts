import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/monitoring/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class MonitoringProtocol {
	static ID = 0x13;
	static Name = 'Monitoring';

	static Methods = {
		PingDaemon: 0x1,
		GetClusterMembers: 0x2
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: MonitoringProtocol.PingDaemon,
		0x2: MonitoringProtocol.GetClusterMembers
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MonitoringProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static PingDaemon(message: RMCMessage): typeof Methods.PingDaemon.Request | typeof Methods.PingDaemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PingDaemon.Request;
		} else {
			return Methods.PingDaemon.Response;
		}
	}

	private static GetClusterMembers(message: RMCMessage): typeof Methods.GetClusterMembers.Request | typeof Methods.GetClusterMembers.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetClusterMembers.Request;
		} else {
			return Methods.GetClusterMembers.Response;
		}
	}
}
