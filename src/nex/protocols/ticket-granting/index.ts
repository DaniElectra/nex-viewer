import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/ticket-granting/methods';
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

	private static handlersSwitch: Record<number, (message: RMCMessage) => any> = {
		0x1: TicketGrantingProtocol.ValidateAndRequestTicket,
		0x2: TicketGrantingProtocol.ValidateAndRequestTicketWithCustomData,
		0x3: TicketGrantingProtocol.RequestTicket
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		let handler;

		if (packet.version === 2) {
			handler = TicketGrantingProtocol.handlersSwitch[methodID];
		} else {
			handler = TicketGrantingProtocol.handlers[methodID];
		}

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
	}

	private static Login(message: RMCMessage): typeof Methods.Login.Request | typeof Methods.Login.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.Login.Request;
		} else {
			return Methods.Login.Response;
		}
	}

	private static LoginEx(message: RMCMessage): typeof Methods.LoginEx.Request | typeof Methods.LoginEx.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.LoginEx.Request;
		} else {
			return Methods.LoginEx.Response;
		}
	}

	private static RequestTicket(message: RMCMessage): typeof Methods.RequestTicket.Request | typeof Methods.RequestTicket.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RequestTicket.Request;
		} else {
			return Methods.RequestTicket.Response;
		}
	}

	private static ValidateAndRequestTicket(message: RMCMessage): typeof Methods.ValidateAndRequestTicket.Request | typeof Methods.ValidateAndRequestTicket.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ValidateAndRequestTicket.Request;
		} else {
			return Methods.ValidateAndRequestTicket.Response;
		}
	}

	private static ValidateAndRequestTicketWithCustomData(message: RMCMessage): typeof Methods.ValidateAndRequestTicketWithCustomData.Request | typeof Methods.ValidateAndRequestTicketWithCustomData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ValidateAndRequestTicketWithCustomData.Request;
		} else {
			return Methods.ValidateAndRequestTicketWithCustomData.Response;
		}
	}
}