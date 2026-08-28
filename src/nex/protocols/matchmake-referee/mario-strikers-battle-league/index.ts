import RMCMessage from '@/nex/rmc-message';
import MatchmakeRefereeProtocol from '@/nex/protocols/matchmake-referee';
import * as Methods from '@/nex/protocols/matchmake-referee/mario-strikers-battle-league/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class MatchmakeRefereeProtocolMarioStrikersBattleLeague {
	static ID = 0x78;
	static Name = 'MatchmakeReferee (Mario Strikers: Battle League)';

	static Methods = {
		GetClubStats: 0x0E,
		GetClubStatsMulti: 0x0F,
		EndRoundNoContest: 0x10,
		GetPlayerSeasonStats: 0x11,
		UpdateStatsForDebug: 0x12,
		UpdateClubStatsForDebug: 0x13
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x0E: MatchmakeRefereeProtocolMarioStrikersBattleLeague.GetClubStats,
		0x0F: MatchmakeRefereeProtocolMarioStrikersBattleLeague.GetClubStatsMulti,
		0x10: MatchmakeRefereeProtocolMarioStrikersBattleLeague.EndRoundNoContest,
		0x11: MatchmakeRefereeProtocolMarioStrikersBattleLeague.GetPlayerSeasonStats,
		0x12: MatchmakeRefereeProtocolMarioStrikersBattleLeague.UpdateStatsForDebug,
		0x13: MatchmakeRefereeProtocolMarioStrikersBattleLeague.UpdateClubStatsForDebug
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeRefereeProtocolMarioStrikersBattleLeague.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			MatchmakeRefereeProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static GetClubStats(message: RMCMessage): typeof Methods.GetClubStats.Request | typeof Methods.GetClubStats.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetClubStats.Request;
		} else {
			return Methods.GetClubStats.Response;
		}
	}

	private static GetClubStatsMulti(message: RMCMessage): typeof Methods.GetClubStatsMulti.Request | typeof Methods.GetClubStatsMulti.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetClubStatsMulti.Request;
		} else {
			return Methods.GetClubStatsMulti.Response;
		}
	}

	private static EndRoundNoContest(message: RMCMessage): typeof Methods.EndRoundNoContest.Request | typeof Methods.EndRoundNoContest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.EndRoundNoContest.Request;
		} else {
			return Methods.EndRoundNoContest.Response;
		}
	}

	private static GetPlayerSeasonStats(message: RMCMessage): typeof Methods.GetPlayerSeasonStats.Request | typeof Methods.GetPlayerSeasonStats.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPlayerSeasonStats.Request;
		} else {
			return Methods.GetPlayerSeasonStats.Response;
		}
	}

	private static UpdateStatsForDebug(message: RMCMessage): typeof Methods.UpdateStatsForDebug.Request | typeof Methods.UpdateStatsForDebug.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateStatsForDebug.Request;
		} else {
			return Methods.UpdateStatsForDebug.Response;
		}
	}

	private static UpdateClubStatsForDebug(message: RMCMessage): typeof Methods.UpdateClubStatsForDebug.Request | typeof Methods.UpdateClubStatsForDebug.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateClubStatsForDebug.Request;
		} else {
			return Methods.UpdateClubStatsForDebug.Response;
		}
	}
}
