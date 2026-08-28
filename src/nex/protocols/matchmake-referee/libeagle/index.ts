import RMCMessage from '@/nex/rmc-message';
import MatchmakeRefereeProtocol from '@/nex/protocols/matchmake-referee';
import * as Methods from '@/nex/protocols/matchmake-referee/libeagle/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class MatchmakeRefereeProtocolLibEagle {
	static ID = 0x78;
	static Name = 'MatchmakeReferee (LibEagle)';

	static Methods = {
		StartRound: 0x1,
		GetStartRoundParam: 0x2,
		EndRound: 0x3,
		EndRoundWithPartialReport: 0x4,
		EndRoundWithoutReport: 0x5,
		GetRoundParticipants: 0x6,
		GetNotSummarizedRound: 0x7,
		GetRound: 0x8,
		GetStatsPrimary: 0x9,
		GetStatsPrimaries: 0xA,
		GetStatsAll: 0xB,
		CreateStats: 0xC,
		GetOrCreateStats: 0xD,
		ResetStats: 0xE,
		GetEventPoint: 0xF,
		ResetEventPoint: 0x10
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: MatchmakeRefereeProtocolLibEagle.StartRound,
		0x2: MatchmakeRefereeProtocolLibEagle.GetStartRoundParam,
		0x3: MatchmakeRefereeProtocolLibEagle.EndRound,
		0x4: MatchmakeRefereeProtocolLibEagle.EndRoundWithPartialReport,
		0x5: MatchmakeRefereeProtocolLibEagle.EndRoundWithoutReport,
		0x6: MatchmakeRefereeProtocolLibEagle.GetRoundParticipants,
		0x7: MatchmakeRefereeProtocolLibEagle.GetNotSummarizedRound,
		0x8: MatchmakeRefereeProtocolLibEagle.GetRound,
		0x9: MatchmakeRefereeProtocolLibEagle.GetStatsPrimary,
		0xA: MatchmakeRefereeProtocolLibEagle.GetStatsPrimaries,
		0xB: MatchmakeRefereeProtocolLibEagle.GetStatsAll,
		0xC: MatchmakeRefereeProtocolLibEagle.CreateStats,
		0xD: MatchmakeRefereeProtocolLibEagle.GetOrCreateStats,
		0xE: MatchmakeRefereeProtocolLibEagle.ResetStats,
		0xF: MatchmakeRefereeProtocolLibEagle.GetEventPoint,
		0x10: MatchmakeRefereeProtocolLibEagle.ResetEventPoint
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeRefereeProtocolLibEagle.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			MatchmakeRefereeProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static StartRound(message: RMCMessage): typeof Methods.StartRound.Request | typeof Methods.StartRound.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.StartRound.Request;
		} else {
			return Methods.StartRound.Response;
		}
	}

	private static GetStartRoundParam(message: RMCMessage): typeof Methods.GetStartRoundParam.Request | typeof Methods.GetStartRoundParam.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetStartRoundParam.Request;
		} else {
			return Methods.GetStartRoundParam.Response;
		}
	}

	private static EndRound(message: RMCMessage): typeof Methods.EndRound.Request | typeof Methods.EndRound.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.EndRound.Request;
		} else {
			return Methods.EndRound.Response;
		}
	}

	private static EndRoundWithPartialReport(message: RMCMessage): typeof Methods.EndRoundWithPartialReport.Request | typeof Methods.EndRoundWithPartialReport.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.EndRoundWithPartialReport.Request;
		} else {
			return Methods.EndRoundWithPartialReport.Response;
		}
	}

	private static EndRoundWithoutReport(message: RMCMessage): typeof Methods.EndRoundWithoutReport.Request | typeof Methods.EndRoundWithoutReport.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.EndRoundWithoutReport.Request;
		} else {
			return Methods.EndRoundWithoutReport.Response;
		}
	}

	private static GetRoundParticipants(message: RMCMessage): typeof Methods.GetRoundParticipants.Request | typeof Methods.GetRoundParticipants.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRoundParticipants.Request;
		} else {
			return Methods.GetRoundParticipants.Response;
		}
	}

	private static GetNotSummarizedRound(message: RMCMessage): typeof Methods.GetNotSummarizedRound.Request | typeof Methods.GetNotSummarizedRound.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetNotSummarizedRound.Request;
		} else {
			return Methods.GetNotSummarizedRound.Response;
		}
	}

	private static GetRound(message: RMCMessage): typeof Methods.GetRound.Request | typeof Methods.GetRound.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRound.Request;
		} else {
			return Methods.GetRound.Response;
		}
	}

	private static GetStatsPrimary(message: RMCMessage): typeof Methods.GetStatsPrimary.Request | typeof Methods.GetStatsPrimary.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetStatsPrimary.Request;
		} else {
			return Methods.GetStatsPrimary.Response;
		}
	}

	private static GetStatsPrimaries(message: RMCMessage): typeof Methods.GetStatsPrimaries.Request | typeof Methods.GetStatsPrimaries.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetStatsPrimaries.Request;
		} else {
			return Methods.GetStatsPrimaries.Response;
		}
	}

	private static GetStatsAll(message: RMCMessage): typeof Methods.GetStatsAll.Request | typeof Methods.GetStatsAll.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetStatsAll.Request;
		} else {
			return Methods.GetStatsAll.Response;
		}
	}

	private static CreateStats(message: RMCMessage): typeof Methods.CreateStats.Request | typeof Methods.CreateStats.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CreateStats.Request;
		} else {
			return Methods.CreateStats.Response;
		}
	}

	private static GetOrCreateStats(message: RMCMessage): typeof Methods.GetOrCreateStats.Request | typeof Methods.GetOrCreateStats.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetOrCreateStats.Request;
		} else {
			return Methods.GetOrCreateStats.Response;
		}
	}

	private static ResetStats(message: RMCMessage): typeof Methods.ResetStats.Request | typeof Methods.ResetStats.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ResetStats.Request;
		} else {
			return Methods.ResetStats.Response;
		}
	}

	private static GetEventPoint(message: RMCMessage): typeof Methods.GetEventPoint.Request | typeof Methods.GetEventPoint.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetEventPoint.Request;
		} else {
			return Methods.GetEventPoint.Response;
		}
	}

	private static ResetEventPoint(message: RMCMessage): typeof Methods.ResetEventPoint.Request | typeof Methods.ResetEventPoint.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ResetEventPoint.Request;
		} else {
			return Methods.ResetEventPoint.Response;
		}
	}
}
