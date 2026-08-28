import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/health/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class HealthProtocol {
	static ID = 0x12;
	static Name = 'Health';

	static Methods = {
		PingDaemon: 0x1,
		PingDatabase: 0x2,
		RunSanityCheck: 0x3,
		FixSanityErrors: 0x4
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: HealthProtocol.PingDaemon,
		0x2: HealthProtocol.PingDatabase,
		0x3: HealthProtocol.RunSanityCheck,
		0x4: HealthProtocol.FixSanityErrors
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = HealthProtocol.handlers[methodID];

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

	private static PingDatabase(message: RMCMessage): typeof Methods.PingDatabase.Request | typeof Methods.PingDatabase.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PingDatabase.Request;
		} else {
			return Methods.PingDatabase.Response;
		}
	}

	private static RunSanityCheck(message: RMCMessage): typeof Methods.RunSanityCheck.Request | typeof Methods.RunSanityCheck.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RunSanityCheck.Request;
		} else {
			return Methods.RunSanityCheck.Response;
		}
	}

	private static FixSanityErrors(message: RMCMessage): typeof Methods.FixSanityErrors.Request | typeof Methods.FixSanityErrors.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FixSanityErrors.Request;
		} else {
			return Methods.FixSanityErrors.Response;
		}
	}
}
