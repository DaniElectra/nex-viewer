import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/tournament/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class TournamentProtocol {
	static ID = 0xC9;
	static Name = 'Tournament';

	static Methods = {
		UnknownMethod0x1: 0x1,
		UnknownMethod0x2: 0x2,
		UnknownMethod0x3: 0x3,
		UnknownMethod0x4: 0x4,
		UnknownMethod0x5: 0x5,
		UnknownMethod0x6: 0x6,
		UnknownMethod0x7: 0x7,
		UnknownMethod0x8: 0x8,
		UnknownMethod0x9: 0x9,
		UnknownMethod0xA: 0xA,
		UnknownMethod0xB: 0xB,
		UnknownMethod0xC: 0xC,
		UnknownMethod0xD: 0xD,
		UnknownMethod0xE: 0xE,
		UnknownMethod0xF: 0xF
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: TournamentProtocol.UnknownMethod0x1,
		0x2: TournamentProtocol.UnknownMethod0x2,
		0x3: TournamentProtocol.UnknownMethod0x3,
		0x4: TournamentProtocol.UnknownMethod0x4,
		0x5: TournamentProtocol.UnknownMethod0x5,
		0x6: TournamentProtocol.UnknownMethod0x6,
		0x7: TournamentProtocol.UnknownMethod0x7,
		0x8: TournamentProtocol.UnknownMethod0x8,
		0x9: TournamentProtocol.UnknownMethod0x9,
		0xA: TournamentProtocol.UnknownMethod0xA,
		0xB: TournamentProtocol.UnknownMethod0xB,
		0xC: TournamentProtocol.UnknownMethod0xC,
		0xD: TournamentProtocol.UnknownMethod0xD,
		0xE: TournamentProtocol.UnknownMethod0xE,
		0xF: TournamentProtocol.UnknownMethod0xF
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = TournamentProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static UnknownMethod0x1(message: RMCMessage): typeof Methods.UnknownMethod0x1.Request | typeof Methods.UnknownMethod0x1.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x1.Request;
		} else {
			return Methods.UnknownMethod0x1.Response;
		}
	}

	private static UnknownMethod0x2(message: RMCMessage): typeof Methods.UnknownMethod0x2.Request | typeof Methods.UnknownMethod0x2.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x2.Request;
		} else {
			return Methods.UnknownMethod0x2.Response;
		}
	}

	private static UnknownMethod0x3(message: RMCMessage): typeof Methods.UnknownMethod0x3.Request | typeof Methods.UnknownMethod0x3.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x3.Request;
		} else {
			return Methods.UnknownMethod0x3.Response;
		}
	}

	private static UnknownMethod0x4(message: RMCMessage): typeof Methods.UnknownMethod0x4.Request | typeof Methods.UnknownMethod0x4.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x4.Request;
		} else {
			return Methods.UnknownMethod0x4.Response;
		}
	}

	private static UnknownMethod0x5(message: RMCMessage): typeof Methods.UnknownMethod0x5.Request | typeof Methods.UnknownMethod0x5.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x5.Request;
		} else {
			return Methods.UnknownMethod0x5.Response;
		}
	}

	private static UnknownMethod0x6(message: RMCMessage): typeof Methods.UnknownMethod0x6.Request | typeof Methods.UnknownMethod0x6.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x6.Request;
		} else {
			return Methods.UnknownMethod0x6.Response;
		}
	}

	private static UnknownMethod0x7(message: RMCMessage): typeof Methods.UnknownMethod0x7.Request | typeof Methods.UnknownMethod0x7.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x7.Request;
		} else {
			return Methods.UnknownMethod0x7.Response;
		}
	}

	private static UnknownMethod0x8(message: RMCMessage): typeof Methods.UnknownMethod0x8.Request | typeof Methods.UnknownMethod0x8.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x8.Request;
		} else {
			return Methods.UnknownMethod0x8.Response;
		}
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

	private static UnknownMethod0xB(message: RMCMessage): typeof Methods.UnknownMethod0xB.Request | typeof Methods.UnknownMethod0xB.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0xB.Request;
		} else {
			return Methods.UnknownMethod0xB.Response;
		}
	}

	private static UnknownMethod0xC(message: RMCMessage): typeof Methods.UnknownMethod0xC.Request | typeof Methods.UnknownMethod0xC.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0xC.Request;
		} else {
			return Methods.UnknownMethod0xC.Response;
		}
	}

	private static UnknownMethod0xD(message: RMCMessage): typeof Methods.UnknownMethod0xD.Request | typeof Methods.UnknownMethod0xD.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0xD.Request;
		} else {
			return Methods.UnknownMethod0xD.Response;
		}
	}

	private static UnknownMethod0xE(message: RMCMessage): typeof Methods.UnknownMethod0xE.Request | typeof Methods.UnknownMethod0xE.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0xE.Request;
		} else {
			return Methods.UnknownMethod0xE.Response;
		}
	}

	private static UnknownMethod0xF(message: RMCMessage): typeof Methods.UnknownMethod0xF.Request | typeof Methods.UnknownMethod0xF.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0xF.Request;
		} else {
			return Methods.UnknownMethod0xF.Response;
		}
	}
}
