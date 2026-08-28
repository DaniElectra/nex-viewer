import RMCMessage from '@/nex/rmc-message';
import RankingProtocol from '@/nex/protocols/ranking';
import * as Methods from '@/nex/protocols/ranking/xenoblade-chronicles-x/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class RankingProtocolXenobladeChroniclesX {
	static ID = 0x70;
	static Name = 'Ranking (Xenoblade Chronicles X)';

	static Methods = {
		UploadScores_Lazy: 0x0E,
		GetMultiCategoryRanking_Lazy: 0x0F,
		DebugUpdateRanking_Lazy: 0x10
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x0E: RankingProtocolXenobladeChroniclesX.UploadScores_Lazy,
		0x0F: RankingProtocolXenobladeChroniclesX.GetMultiCategoryRanking_Lazy,
		0x10: RankingProtocolXenobladeChroniclesX.DebugUpdateRanking_Lazy
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = RankingProtocolXenobladeChroniclesX.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			RankingProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static UploadScores_Lazy(message: RMCMessage): typeof Methods.UploadScores_Lazy.Request | typeof Methods.UploadScores_Lazy.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadScores_Lazy.Request;
		} else {
			return Methods.UploadScores_Lazy.Response;
		}
	}

	private static GetMultiCategoryRanking_Lazy(message: RMCMessage): typeof Methods.GetMultiCategoryRanking_Lazy.Request | typeof Methods.GetMultiCategoryRanking_Lazy.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetMultiCategoryRanking_Lazy.Request;
		} else {
			return Methods.GetMultiCategoryRanking_Lazy.Response;
		}
	}

	private static DebugUpdateRanking_Lazy(message: RMCMessage): typeof Methods.DebugUpdateRanking_Lazy.Request | typeof Methods.DebugUpdateRanking_Lazy.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DebugUpdateRanking_Lazy.Request;
		} else {
			return Methods.DebugUpdateRanking_Lazy.Response;
		}
	}
}
