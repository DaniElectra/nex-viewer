import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/matchmake-referee/methods';
import type Packet from '@/types/nex/packet';

export default class MatchmakeRefereeProtocol {
	static ID = 0x78;
	static Name = 'MatchmakeReferee';

	static Methods = {
		StartRound: 0x01,
		GetStartRoundParam: 0x02,
		EndRound: 0x03,
		EndRoundWithoutReport: 0x04,
		GetRoundParticipants: 0x05,
		GetNotSummarizedRound: 0x06,
		GetRound: 0x07,
		GetStatsPrimary: 0x08,
		GetStatsPrimaries: 0x09,
		GetStatsAll: 0x0A,
		CreateStats: 0x0B,
		GetOrCreateStats: 0x0C,
		ResetStats: 0x0D
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x01: MatchmakeRefereeProtocol.StartRound,
		0x02: MatchmakeRefereeProtocol.GetStartRoundParam,
		0x03: MatchmakeRefereeProtocol.EndRound,
		0x04: MatchmakeRefereeProtocol.EndRoundWithoutReport,
		0x05: MatchmakeRefereeProtocol.GetRoundParticipants,
		0x06: MatchmakeRefereeProtocol.GetNotSummarizedRound,
		0x07: MatchmakeRefereeProtocol.GetRound,
		0x08: MatchmakeRefereeProtocol.GetStatsPrimary,
		0x09: MatchmakeRefereeProtocol.GetStatsPrimaries,
		0x0A: MatchmakeRefereeProtocol.GetStatsAll,
		0x0B: MatchmakeRefereeProtocol.CreateStats,
		0x0C: MatchmakeRefereeProtocol.GetOrCreateStats,
		0x0D: MatchmakeRefereeProtocol.ResetStats
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeRefereeProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
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
}
