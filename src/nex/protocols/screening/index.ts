import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/screening/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class ScreeningProtocol {
	static ID = 0x7C;
	static Name = 'Screening';

	static Methods = {
		ReportDataStoreContent: 0x1,
		ReportUser: 0x2
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: ScreeningProtocol.ReportDataStoreContent,
		0x2: ScreeningProtocol.ReportUser
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = ScreeningProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static ReportDataStoreContent(message: RMCMessage): typeof Methods.ReportDataStoreContent.Request | typeof Methods.ReportDataStoreContent.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReportDataStoreContent.Request;
		} else {
			return Methods.ReportDataStoreContent.Response;
		}
	}

	private static ReportUser(message: RMCMessage): typeof Methods.ReportUser.Request | typeof Methods.ReportUser.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReportUser.Request;
		} else {
			return Methods.ReportUser.Response;
		}
	}
}
