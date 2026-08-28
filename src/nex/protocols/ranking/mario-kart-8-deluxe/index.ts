import RMCMessage from '@/nex/rmc-message';
import RankingProtocol from '@/nex/protocols/ranking';
import * as Methods from '@/nex/protocols/ranking/mario-kart-8-deluxe/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class RankingProtocolMarioKart8Deluxe {
	static ID = 0x70;
	static Name = 'Ranking (Mario Kart 8 Deluxe)';

	static Methods = {
		GetCompetitionRankingScore: 0x10,
		UploadCompetitionRankingScore: 0x11,
		GetCompetitionInfo: 0x12,
		UploadScorePack: 0x13,
		GetScorePack: 0x14,
		ExecuteDeleteScoreJob: 0x15,
		GetCommonDataByPIDList: 0x16
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x10: RankingProtocolMarioKart8Deluxe.GetCompetitionRankingScore,
		0x11: RankingProtocolMarioKart8Deluxe.UploadCompetitionRankingScore,
		0x12: RankingProtocolMarioKart8Deluxe.GetCompetitionInfo,
		0x13: RankingProtocolMarioKart8Deluxe.UploadScorePack,
		0x14: RankingProtocolMarioKart8Deluxe.GetScorePack,
		0x15: RankingProtocolMarioKart8Deluxe.ExecuteDeleteScoreJob,
		0x16: RankingProtocolMarioKart8Deluxe.GetCommonDataByPIDList
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = RankingProtocolMarioKart8Deluxe.handlers[methodID];

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

	private static UploadScorePack(message: RMCMessage): typeof Methods.UploadScorePack.Request | typeof Methods.UploadScorePack.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadScorePack.Request;
		} else {
			return Methods.UploadScorePack.Response;
		}
	}

	private static GetScorePack(message: RMCMessage): typeof Methods.GetScorePack.Request | typeof Methods.GetScorePack.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetScorePack.Request;
		} else {
			return Methods.GetScorePack.Response;
		}
	}

	private static ExecuteDeleteScoreJob(message: RMCMessage): typeof Methods.ExecuteDeleteScoreJob.Request | typeof Methods.ExecuteDeleteScoreJob.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ExecuteDeleteScoreJob.Request;
		} else {
			return Methods.ExecuteDeleteScoreJob.Response;
		}
	}

	private static GetCommonDataByPIDList(message: RMCMessage): typeof Methods.GetCommonDataByPIDList.Request | typeof Methods.GetCommonDataByPIDList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCommonDataByPIDList.Request;
		} else {
			return Methods.GetCommonDataByPIDList.Response;
		}
	}
}
