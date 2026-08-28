import RMCMessage from '@/nex/rmc-message';
import RankingProtocol from '@/nex/protocols/ranking';
import * as Methods from '@/nex/protocols/ranking/splatoon/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class RankingProtocolSplatoon {
	static ID = 0x70;
	static Name = 'Ranking (Splatoon)';

	static Methods = {
		GetCompetitionRankingScore: 0x10,
		GetcompetitionRankingScoreByPeriodList: 0x11,
		UploadCompetitionRankingScore: 0x12,
		DeleteCompetitionRankingScore: 0x13
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x10: RankingProtocolSplatoon.GetCompetitionRankingScore,
		0x11: RankingProtocolSplatoon.GetcompetitionRankingScoreByPeriodList,
		0x12: RankingProtocolSplatoon.UploadCompetitionRankingScore,
		0x13: RankingProtocolSplatoon.DeleteCompetitionRankingScore
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = RankingProtocolSplatoon.handlers[methodID];

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

	private static GetcompetitionRankingScoreByPeriodList(message: RMCMessage): typeof Methods.GetcompetitionRankingScoreByPeriodList.Request | typeof Methods.GetcompetitionRankingScoreByPeriodList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetcompetitionRankingScoreByPeriodList.Request;
		} else {
			return Methods.GetcompetitionRankingScoreByPeriodList.Response;
		}
	}

	private static UploadCompetitionRankingScore(message: RMCMessage): typeof Methods.UploadCompetitionRankingScore.Request | typeof Methods.UploadCompetitionRankingScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadCompetitionRankingScore.Request;
		} else {
			return Methods.UploadCompetitionRankingScore.Response;
		}
	}

	private static DeleteCompetitionRankingScore(message: RMCMessage): typeof Methods.DeleteCompetitionRankingScore.Request | typeof Methods.DeleteCompetitionRankingScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteCompetitionRankingScore.Request;
		} else {
			return Methods.DeleteCompetitionRankingScore.Response;
		}
	}
}
