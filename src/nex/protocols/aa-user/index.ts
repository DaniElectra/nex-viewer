import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/aa-user/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class AAUserProtocol {
	static ID = 0x7B;
	static Name = 'AAUser';

	static Methods = {
		RegisterApplication: 0x1,
		UnregisterApplication: 0x2,
		SetApplicationInfo: 0x3,
		GetApplicationInfo: 0x4
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: AAUserProtocol.RegisterApplication,
		0x2: AAUserProtocol.UnregisterApplication,
		0x3: AAUserProtocol.SetApplicationInfo,
		0x4: AAUserProtocol.GetApplicationInfo
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = AAUserProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static RegisterApplication(message: RMCMessage): typeof Methods.RegisterApplication.Request | typeof Methods.RegisterApplication.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RegisterApplication.Request;
		} else {
			return Methods.RegisterApplication.Response;
		}
	}

	private static UnregisterApplication(message: RMCMessage): typeof Methods.UnregisterApplication.Request | typeof Methods.UnregisterApplication.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnregisterApplication.Request;
		} else {
			return Methods.UnregisterApplication.Response;
		}
	}

	private static SetApplicationInfo(message: RMCMessage): typeof Methods.SetApplicationInfo.Request | typeof Methods.SetApplicationInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SetApplicationInfo.Request;
		} else {
			return Methods.SetApplicationInfo.Response;
		}
	}

	private static GetApplicationInfo(message: RMCMessage): typeof Methods.GetApplicationInfo.Request | typeof Methods.GetApplicationInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetApplicationInfo.Request;
		} else {
			return Methods.GetApplicationInfo.Response;
		}
	}
}
