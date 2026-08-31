import RMCMessage from '@/nex/rmc-message';
import RankingProtocol from '@/nex/protocols/ranking';
import * as Methods from '@/nex/protocols/ranking/mario-kart-8/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class RankingProtocolMarioKart8 {
	static ID = 0x70;
	static Name = 'Ranking (Mario Kart 8)';

	static Methods = {
		GetCompetitionRankingScore: 0xE,
		UploadCompetitionRankingScore: 0xF,
		GetCompetitionInfo: 0x10
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0xE: RankingProtocolMarioKart8.GetCompetitionRankingScore,
		0xF: RankingProtocolMarioKart8.UploadCompetitionRankingScore,
		0x10: RankingProtocolMarioKart8.GetCompetitionInfo
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = RankingProtocolMarioKart8.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			RankingProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static GetCompetitionRankingScore(message: RMCMessage): typeof Methods.GetCompetitionRankingScore.Request | typeof Methods.GetCompetitionRankingScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCompetitionRankingScore.Request;
		} else {
			return Methods.GetCompetitionRankingScore.Response;
		}
	}

	private static UploadCompetitionRankingScore(message: RMCMessage): typeof Methods.UploadCompetitionRankingScore.Request | typeof Methods.UploadCompetitionRankingScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadCompetitionRankingScore.Request;
		} else {
			return Methods.UploadCompetitionRankingScore.Response;
		}
	}

	private static GetCompetitionInfo(message: RMCMessage): typeof Methods.GetCompetitionInfo.Request | typeof Methods.GetCompetitionInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCompetitionInfo.Request;
		} else {
			return Methods.GetCompetitionInfo.Response;
		}
	}
}
