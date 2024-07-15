import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/secure-connection/methods';
import type Packet from '@/types/nex/packet';

export default class SecureConnectionProtocol {
	static ID = 0xB;
	static Name = 'SecureConnection';

	static Methods = {
		Register: 0x1,
		RequestConnectionData: 0x2,
		RequestUrls: 0x3,
		RegisterEx: 0x4,
		TestConnectivity: 0x5,
		UpdateURLs: 0x6,
		ReplaceURL: 0x7,
		SendReport: 0x8
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: SecureConnectionProtocol.Register,
		0x4: SecureConnectionProtocol.RegisterEx
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;

		// TODO - Use Switch names when parsing Switch packets
		const handler = SecureConnectionProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
	}

	private static Register(message: RMCMessage): typeof Methods.Register.Request | typeof Methods.Register.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.Register.Request;
		} else {
			return Methods.Register.Response;
		}
	}

	private static RegisterEx(message: RMCMessage): typeof Methods.RegisterEx.Request | typeof Methods.RegisterEx.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RegisterEx.Request;
		} else {
			return Methods.RegisterEx.Response;
		}
	}
}