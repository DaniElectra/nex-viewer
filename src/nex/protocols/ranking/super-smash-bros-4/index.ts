import RMCMessage from '@/nex/rmc-message';
import RankingProtocol from '@/nex/protocols/ranking';
import * as Methods from '@/nex/protocols/ranking/super-smash-bros-4/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class RankingProtocolSuperSmashBros4 {
	static ID = 0x70;
	static Name = 'Ranking (Super Smash Bros. 4)';

	static Methods = {
		GetCommunityCompetitionScore: 0x0E,
		GetCommunityCompetitionRankData: 0x0F,
		GetCommunityCompetitionRanking: 0x10,
		PutCommunityCompetitionScore: 0x11,
		DeleteCommunityCompetitionScore: 0x12,
		DeleteCommunityCompetitionScores: 0x13,
		DEBUG_PutCommunityCompetitionScores: 0x14
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x0E: RankingProtocolSuperSmashBros4.GetCommunityCompetitionScore,
		0x0F: RankingProtocolSuperSmashBros4.GetCommunityCompetitionRankData,
		0x10: RankingProtocolSuperSmashBros4.GetCommunityCompetitionRanking,
		0x11: RankingProtocolSuperSmashBros4.PutCommunityCompetitionScore,
		0x12: RankingProtocolSuperSmashBros4.DeleteCommunityCompetitionScore,
		0x13: RankingProtocolSuperSmashBros4.DeleteCommunityCompetitionScores,
		0x14: RankingProtocolSuperSmashBros4.DEBUG_PutCommunityCompetitionScores
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = RankingProtocolSuperSmashBros4.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			RankingProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static GetCommunityCompetitionScore(message: RMCMessage): typeof Methods.GetCommunityCompetitionScore.Request | typeof Methods.GetCommunityCompetitionScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCommunityCompetitionScore.Request;
		} else {
			return Methods.GetCommunityCompetitionScore.Response;
		}
	}

	private static GetCommunityCompetitionRankData(message: RMCMessage): typeof Methods.GetCommunityCompetitionRankData.Request | typeof Methods.GetCommunityCompetitionRankData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCommunityCompetitionRankData.Request;
		} else {
			return Methods.GetCommunityCompetitionRankData.Response;
		}
	}

	private static GetCommunityCompetitionRanking(message: RMCMessage): typeof Methods.GetCommunityCompetitionRanking.Request | typeof Methods.GetCommunityCompetitionRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCommunityCompetitionRanking.Request;
		} else {
			return Methods.GetCommunityCompetitionRanking.Response;
		}
	}

	private static PutCommunityCompetitionScore(message: RMCMessage): typeof Methods.PutCommunityCompetitionScore.Request | typeof Methods.PutCommunityCompetitionScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PutCommunityCompetitionScore.Request;
		} else {
			return Methods.PutCommunityCompetitionScore.Response;
		}
	}

	private static DeleteCommunityCompetitionScore(message: RMCMessage): typeof Methods.DeleteCommunityCompetitionScore.Request | typeof Methods.DeleteCommunityCompetitionScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteCommunityCompetitionScore.Request;
		} else {
			return Methods.DeleteCommunityCompetitionScore.Response;
		}
	}

	private static DeleteCommunityCompetitionScores(message: RMCMessage): typeof Methods.DeleteCommunityCompetitionScores.Request | typeof Methods.DeleteCommunityCompetitionScores.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteCommunityCompetitionScores.Request;
		} else {
			return Methods.DeleteCommunityCompetitionScores.Response;
		}
	}

	private static DEBUG_PutCommunityCompetitionScores(message: RMCMessage): typeof Methods.DEBUG_PutCommunityCompetitionScores.Request | typeof Methods.DEBUG_PutCommunityCompetitionScores.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DEBUG_PutCommunityCompetitionScores.Request;
		} else {
			return Methods.DEBUG_PutCommunityCompetitionScores.Response;
		}
	}
}
