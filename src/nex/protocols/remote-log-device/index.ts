import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/remote-log-device/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class RemoteLogDeviceProtocol {
	static ID = 0x1;
	static Name = 'RemoteLogDevice';

	static Methods = {
		Log: 0x1
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: RemoteLogDeviceProtocol.Log
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = RemoteLogDeviceProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static Log(message: RMCMessage): typeof Methods.Log.Request | typeof Methods.Log.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.Log.Request;
		} else {
			return Methods.Log.Response;
		}
	}
}
