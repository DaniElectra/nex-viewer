import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/ranking-2/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class Ranking2Protocol {
	static ID = 0x7A;
	static Name = 'Ranking2';

	static Methods = {
		PutScore: 0x1,
		GetCommonData: 0x2,
		PutCommonData: 0x3,
		DeleteCommonData: 0x4,
		GetRanking: 0x5,
		GetRankingByPrincipalId: 0x6,
		GetCategorySetting: 0x7,
		GetRankingChart: 0x8,
		GetRankingCharts: 0x9,
		GetEstimateScoreRank: 0xA
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: Ranking2Protocol.PutScore,
		0x2: Ranking2Protocol.GetCommonData,
		0x3: Ranking2Protocol.PutCommonData,
		0x4: Ranking2Protocol.DeleteCommonData,
		0x5: Ranking2Protocol.GetRanking,
		0x6: Ranking2Protocol.GetRankingByPrincipalId,
		0x7: Ranking2Protocol.GetCategorySetting,
		0x8: Ranking2Protocol.GetRankingChart,
		0x9: Ranking2Protocol.GetRankingCharts,
		0xA: Ranking2Protocol.GetEstimateScoreRank
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = Ranking2Protocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static PutScore(message: RMCMessage): typeof Methods.PutScore.Request | typeof Methods.PutScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PutScore.Request;
		} else {
			return Methods.PutScore.Response;
		}
	}

	private static GetCommonData(message: RMCMessage): typeof Methods.GetCommonData.Request | typeof Methods.GetCommonData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCommonData.Request;
		} else {
			return Methods.GetCommonData.Response;
		}
	}

	private static PutCommonData(message: RMCMessage): typeof Methods.PutCommonData.Request | typeof Methods.PutCommonData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PutCommonData.Request;
		} else {
			return Methods.PutCommonData.Response;
		}
	}

	private static DeleteCommonData(message: RMCMessage): typeof Methods.DeleteCommonData.Request | typeof Methods.DeleteCommonData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteCommonData.Request;
		} else {
			return Methods.DeleteCommonData.Response;
		}
	}

	private static GetRanking(message: RMCMessage): typeof Methods.GetRanking.Request | typeof Methods.GetRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRanking.Request;
		} else {
			return Methods.GetRanking.Response;
		}
	}

	private static GetRankingByPrincipalId(message: RMCMessage): typeof Methods.GetRankingByPrincipalId.Request | typeof Methods.GetRankingByPrincipalId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRankingByPrincipalId.Request;
		} else {
			return Methods.GetRankingByPrincipalId.Response;
		}
	}

	private static GetCategorySetting(message: RMCMessage): typeof Methods.GetCategorySetting.Request | typeof Methods.GetCategorySetting.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCategorySetting.Request;
		} else {
			return Methods.GetCategorySetting.Response;
		}
	}

	private static GetRankingChart(message: RMCMessage): typeof Methods.GetRankingChart.Request | typeof Methods.GetRankingChart.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRankingChart.Request;
		} else {
			return Methods.GetRankingChart.Response;
		}
	}

	private static GetRankingCharts(message: RMCMessage): typeof Methods.GetRankingCharts.Request | typeof Methods.GetRankingCharts.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRankingCharts.Request;
		} else {
			return Methods.GetRankingCharts.Response;
		}
	}

	private static GetEstimateScoreRank(message: RMCMessage): typeof Methods.GetEstimateScoreRank.Request | typeof Methods.GetEstimateScoreRank.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetEstimateScoreRank.Request;
		} else {
			return Methods.GetEstimateScoreRank.Response;
		}
	}
}
