import RMCMessage from '@/nex/rmc-message';
import * as Requests from '@/nex/protocols/ticket-granting/requests';
import * as Responses from '@/nex/protocols/ticket-granting/responses';
import type Packet from '@/types/nex/packet';

export default class TicketGrantingProtocol {
	static ID = 0xA;
	static Name = 'TicketGranting';

	static Methods = {
		Login: 0x1,
		LoginEx: 0x2,
		RequestTicket: 0x3,
		GetPID: 0x4,
		GetName: 0x5,
		LoginWithContext: 0x6
	};

	static MethodsSwitch = {
		ValidateAndRequestTicket: 0x1,
		ValidateAndRequestTicketWithCustomData: 0x2,
		RequestTicket: 0x3,
		GetPID: 0x4,
		GetName: 0x5,
		ValidateAndRequestTicketWithParam: 0x6
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: TicketGrantingProtocol.Login,
		0x2: TicketGrantingProtocol.LoginEx,
		0x3: TicketGrantingProtocol.RequestTicket
	};

	static handlePacket(packet: Packet): void {
		const methodID = packet.message.methodID;

		// TODO - Use Switch names when parsing Switch packets
		const handler = TicketGrantingProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
	}

	private static Login(message: RMCMessage): typeof Requests.LoginRequest | typeof Responses.LoginResponse {
		if (message.type === RMCMessage.REQUEST) {
			return Requests.LoginRequest;
		} else {
			return Responses.LoginResponse;
		}
	}

	private static LoginEx(message: RMCMessage): typeof Requests.LoginExRequest | typeof Responses.LoginExResponse {
		if (message.type === RMCMessage.REQUEST) {
			return Requests.LoginExRequest;
		} else {
			return Responses.LoginExResponse;
		}
	}

	private static RequestTicket(message: RMCMessage): typeof Requests.RequestTicketRequest | typeof Responses.RequestTicketResponse {
		if (message.type === RMCMessage.REQUEST) {
			return Requests.RequestTicketRequest;
		} else {
			return Responses.RequestTicketResponse;
		}
	}
}