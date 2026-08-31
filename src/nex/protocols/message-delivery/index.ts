import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/message-delivery/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class MessageDeliveryProtocol {
	static ID = 0x1B;
	static Name = 'MessageDelivery';

	static Methods = {
		DeliverMessage: 0x1,
		DeliverMessageMultiTarget: 0x2
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x01: MessageDeliveryProtocol.DeliverMessage,
		0x02: MessageDeliveryProtocol.DeliverMessageMultiTarget
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MessageDeliveryProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static DeliverMessage(message: RMCMessage): typeof Methods.DeliverMessage.Request | typeof Methods.DeliverMessage.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeliverMessage.Request;
		} else {
			return Methods.DeliverMessage.Response;
		}
	}

	private static DeliverMessageMultiTarget(message: RMCMessage): typeof Methods.DeliverMessageMultiTarget.Request | typeof Methods.DeliverMessageMultiTarget.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeliverMessageMultiTarget.Request;
		} else {
			return Methods.DeliverMessageMultiTarget.Response;
		}
	}
}
