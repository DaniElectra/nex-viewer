import RMCMessage from '@/nex/rmc-message';
import * as Requests from '@/nex/protocols/secure-connection/requests';
import * as Responses from '@/nex/protocols/secure-connection/responses';
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

	private static Register(message: RMCMessage): typeof Requests.RegisterRequest | typeof Responses.RegisterResponse {
		if (message.type === RMCMessage.REQUEST) {
			return Requests.RegisterRequest;
		} else {
			return Responses.RegisterResponse;
		}
	}

	private static RegisterEx(message: RMCMessage): typeof Requests.RegisterExRequest | typeof Responses.RegisterExResponse {
		if (message.type === RMCMessage.REQUEST) {
			return Requests.RegisterExRequest;
		} else {
			return Responses.RegisterExResponse;
		}
	}
}