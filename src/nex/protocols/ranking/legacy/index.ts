import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/ranking/legacy/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class RankingProtocolLegacy {
	static ID = 0x70;
	static Name = 'Ranking (Legacy)';

	// * NEX 1 and NEX 2 use different method IDs for the same methods
	static MethodsNEX1 = {
		UploadScore: 0x1,
		DeleteScore: 0x2,
		DeleteAllScore: 0x3,
		UploadCommonData: 0x4,
		DeleteCommonData: 0x5,
		UnknownMethod0x7: 0x6,
		UnknownMethod0x8: 0x7,
		GetTopScore: 0x8,
		GetCommonData: 0x9,
		UnknownMethod0xC: 0xA,
		UnknownMethod0xD: 0xB,
		GetScore: 0xC,
		GetSelfScore: 0xD,
		GetTotal: 0xE
	};

	static MethodsNEX2 = {
		UploadScore: 0x1,
		UploadScores: 0x2,
		DeleteScore: 0x3,
		DeleteAllScore: 0x4,
		UploadCommonData: 0x5,
		DeleteCommonData: 0x6,
		UnknownMethod0x7: 0x7,
		UnknownMethod0x8: 0x8,
		UnknownMethod0x9: 0x9,
		GetTopScore: 0xA,
		GetCommonData: 0xB,
		UnknownMethod0xC: 0xC,
		UnknownMethod0xD: 0xD,
		GetScore: 0xE,
		GetSelfScore: 0xF,
		GetTotal: 0x10,
		UploadScoreWithLimit: 0x11,
		UploadScoresWithLimit: 0x12,
		UnknownMethod0x13: 0x13
	};

	private static handlersNEX1: Record<number, (message: RMCMessage) => any> = {
		0x1: RankingProtocolLegacy.UploadScore,
		0x2: RankingProtocolLegacy.DeleteScore,
		0x3: RankingProtocolLegacy.DeleteAllScore,
		0x4: RankingProtocolLegacy.UploadCommonData,
		0x5: RankingProtocolLegacy.DeleteCommonData,
		0x6: RankingProtocolLegacy.UnknownMethod0x7,
		0x7: RankingProtocolLegacy.UnknownMethod0x8,
		0x8: RankingProtocolLegacy.GetTopScore,
		0x9: RankingProtocolLegacy.GetCommonData,
		0xA: RankingProtocolLegacy.UnknownMethod0xC,
		0xB: RankingProtocolLegacy.UnknownMethod0xD,
		0xC: RankingProtocolLegacy.GetScore,
		0xD: RankingProtocolLegacy.GetSelfScore,
		0xE: RankingProtocolLegacy.GetTotal
	};

	private static handlersNEX2: Record<number, (message: RMCMessage) => any> = {
		0x1: RankingProtocolLegacy.UploadScore,
		0x2: RankingProtocolLegacy.UploadScores,
		0x3: RankingProtocolLegacy.DeleteScore,
		0x4: RankingProtocolLegacy.DeleteAllScore,
		0x5: RankingProtocolLegacy.UploadCommonData,
		0x6: RankingProtocolLegacy.DeleteCommonData,
		0x7: RankingProtocolLegacy.UnknownMethod0x7,
		0x8: RankingProtocolLegacy.UnknownMethod0x8,
		0x9: RankingProtocolLegacy.UnknownMethod0x9,
		0xA: RankingProtocolLegacy.GetTopScore,
		0xB: RankingProtocolLegacy.GetCommonData,
		0xC: RankingProtocolLegacy.UnknownMethod0xC,
		0xD: RankingProtocolLegacy.UnknownMethod0xD,
		0xE: RankingProtocolLegacy.GetScore,
		0xF: RankingProtocolLegacy.GetSelfScore,
		0x10: RankingProtocolLegacy.GetTotal,
		0x11: RankingProtocolLegacy.UploadScoreWithLimit,
		0x12: RankingProtocolLegacy.UploadScoresWithLimit,
		0x13: RankingProtocolLegacy.UnknownMethod0x13
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const nexMajorVersion = Number(packet.message.connection!.title!.libraryVersions.ranking.split('.')[0]);
		const handlers = nexMajorVersion === 1 ? RankingProtocolLegacy.handlersNEX1 : RankingProtocolLegacy.handlersNEX2;
		const handler = handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static UploadScore(message: RMCMessage): typeof Methods.UploadScore.Request | typeof Methods.UploadScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadScore.Request;
		} else {
			return Methods.UploadScore.Response;
		}
	}

	private static UploadScores(message: RMCMessage): typeof Methods.UploadScores.Request | typeof Methods.UploadScores.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadScores.Request;
		} else {
			return Methods.UploadScores.Response;
		}
	}

	private static DeleteScore(message: RMCMessage): typeof Methods.DeleteScore.Request | typeof Methods.DeleteScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteScore.Request;
		} else {
			return Methods.DeleteScore.Response;
		}
	}

	private static DeleteAllScore(message: RMCMessage): typeof Methods.DeleteAllScore.Request | typeof Methods.DeleteAllScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteAllScore.Request;
		} else {
			return Methods.DeleteAllScore.Response;
		}
	}

	private static UploadCommonData(message: RMCMessage): typeof Methods.UploadCommonData.Request | typeof Methods.UploadCommonData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadCommonData.Request;
		} else {
			return Methods.UploadCommonData.Response;
		}
	}

	private static DeleteCommonData(message: RMCMessage): typeof Methods.DeleteCommonData.Request | typeof Methods.DeleteCommonData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteCommonData.Request;
		} else {
			return Methods.DeleteCommonData.Response;
		}
	}

	private static UnknownMethod0x7(message: RMCMessage): typeof Methods.UnknownMethod0x7.Request | typeof Methods.UnknownMethod0x7.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x7.Request;
		} else {
			return Methods.UnknownMethod0x7.Response;
		}
	}

	private static UnknownMethod0x8(message: RMCMessage): typeof Methods.UnknownMethod0x8.Request | typeof Methods.UnknownMethod0x8.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x8.Request;
		} else {
			return Methods.UnknownMethod0x8.Response;
		}
	}

	private static UnknownMethod0x9(message: RMCMessage): typeof Methods.UnknownMethod0x9.Request | typeof Methods.UnknownMethod0x9.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x9.Request;
		} else {
			return Methods.UnknownMethod0x9.Response;
		}
	}

	private static GetTopScore(message: RMCMessage): typeof Methods.GetTopScore.Request | typeof Methods.GetTopScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetTopScore.Request;
		} else {
			return Methods.GetTopScore.Response;
		}
	}

	private static GetCommonData(message: RMCMessage): typeof Methods.GetCommonData.Request | typeof Methods.GetCommonData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCommonData.Request;
		} else {
			return Methods.GetCommonData.Response;
		}
	}

	private static UnknownMethod0xC(message: RMCMessage): typeof Methods.UnknownMethod0xC.Request | typeof Methods.UnknownMethod0xC.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0xC.Request;
		} else {
			return Methods.UnknownMethod0xC.Response;
		}
	}

	private static UnknownMethod0xD(message: RMCMessage): typeof Methods.UnknownMethod0xD.Request | typeof Methods.UnknownMethod0xD.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0xD.Request;
		} else {
			return Methods.UnknownMethod0xD.Response;
		}
	}

	private static GetScore(message: RMCMessage): typeof Methods.GetScore.Request | typeof Methods.GetScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetScore.Request;
		} else {
			return Methods.GetScore.Response;
		}
	}

	private static GetSelfScore(message: RMCMessage): typeof Methods.GetSelfScore.Request | typeof Methods.GetSelfScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSelfScore.Request;
		} else {
			return Methods.GetSelfScore.Response;
		}
	}

	private static GetTotal(message: RMCMessage): typeof Methods.GetTotal.Request | typeof Methods.GetTotal.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetTotal.Request;
		} else {
			return Methods.GetTotal.Response;
		}
	}

	private static UploadScoreWithLimit(message: RMCMessage): typeof Methods.UploadScoreWithLimit.Request | typeof Methods.UploadScoreWithLimit.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadScoreWithLimit.Request;
		} else {
			return Methods.UploadScoreWithLimit.Response;
		}
	}

	private static UploadScoresWithLimit(message: RMCMessage): typeof Methods.UploadScoresWithLimit.Request | typeof Methods.UploadScoresWithLimit.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadScoresWithLimit.Request;
		} else {
			return Methods.UploadScoresWithLimit.Response;
		}
	}

	private static UnknownMethod0x13(message: RMCMessage): typeof Methods.UnknownMethod0x13.Request | typeof Methods.UnknownMethod0x13.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x13.Request;
		} else {
			return Methods.UnknownMethod0x13.Response;
		}
	}
}
