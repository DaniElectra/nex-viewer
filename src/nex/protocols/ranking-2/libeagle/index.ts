import RMCMessage from '@/nex/rmc-message';
import Ranking2Protocol from '@/nex/protocols/ranking-2';
import * as Methods from '@/nex/protocols/ranking-2/libeagle/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class Ranking2ProtocolLibEagle {
	static ID = 0x7A;
	static Name = 'Ranking2 (LibEagle)';

	static Methods = {
		GetEstimateMyScoreRank: 0x0B
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x0B: Ranking2ProtocolLibEagle.GetEstimateMyScoreRank
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = Ranking2ProtocolLibEagle.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			Ranking2Protocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static GetEstimateMyScoreRank(message: RMCMessage): typeof Methods.GetEstimateMyScoreRank.Request | typeof Methods.GetEstimateMyScoreRank.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetEstimateMyScoreRank.Request;
		} else {
			return Methods.GetEstimateMyScoreRank.Response;
		}
	}
}
