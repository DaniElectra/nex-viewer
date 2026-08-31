import RMCMessage from '@/nex/rmc-message';
import RankingProtocol from '@/nex/protocols/ranking';
import * as Methods from '@/nex/protocols/ranking/splatoon-2/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class RankingProtocolSplatoon2 {
	static ID = 0x70;
	static Name = 'Ranking (Splatoon 2)';

	static Methods = {
		UploadLeaguePoint: 0x10,
		GetLeagueResult: 0x11,
		GetFestivalResult: 0x12,
		UploadFestivalVote: 0x13,
		UploadFestivalScore: 0x14,
		DeleteFestival: 0x15,
		UploadXPower: 0x16,
		GetXPowerRanking: 0x17,
		UploadEventMatchResult: 0x18,
		GetEventMatchResult: 0x19,
		AcquireEventMatchRight: 0x1A
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x10: RankingProtocolSplatoon2.UploadLeaguePoint,
		0x11: RankingProtocolSplatoon2.GetLeagueResult,
		0x12: RankingProtocolSplatoon2.GetFestivalResult,
		0x13: RankingProtocolSplatoon2.UploadFestivalVote,
		0x14: RankingProtocolSplatoon2.UploadFestivalScore,
		0x15: RankingProtocolSplatoon2.DeleteFestival,
		0x16: RankingProtocolSplatoon2.UploadXPower,
		0x17: RankingProtocolSplatoon2.GetXPowerRanking,
		0x18: RankingProtocolSplatoon2.UploadEventMatchResult,
		0x19: RankingProtocolSplatoon2.GetEventMatchResult,
		0x1A: RankingProtocolSplatoon2.AcquireEventMatchRight
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = RankingProtocolSplatoon2.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			RankingProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static UploadLeaguePoint(message: RMCMessage): typeof Methods.UploadLeaguePoint.Request | typeof Methods.UploadLeaguePoint.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadLeaguePoint.Request;
		} else {
			return Methods.UploadLeaguePoint.Response;
		}
	}

	private static GetLeagueResult(message: RMCMessage): typeof Methods.GetLeagueResult.Request | typeof Methods.GetLeagueResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetLeagueResult.Request;
		} else {
			return Methods.GetLeagueResult.Response;
		}
	}

	private static GetFestivalResult(message: RMCMessage): typeof Methods.GetFestivalResult.Request | typeof Methods.GetFestivalResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFestivalResult.Request;
		} else {
			return Methods.GetFestivalResult.Response;
		}
	}

	private static UploadFestivalVote(message: RMCMessage): typeof Methods.UploadFestivalVote.Request | typeof Methods.UploadFestivalVote.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadFestivalVote.Request;
		} else {
			return Methods.UploadFestivalVote.Response;
		}
	}

	private static UploadFestivalScore(message: RMCMessage): typeof Methods.UploadFestivalScore.Request | typeof Methods.UploadFestivalScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadFestivalScore.Request;
		} else {
			return Methods.UploadFestivalScore.Response;
		}
	}

	private static DeleteFestival(message: RMCMessage): typeof Methods.DeleteFestival.Request | typeof Methods.DeleteFestival.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteFestival.Request;
		} else {
			return Methods.DeleteFestival.Response;
		}
	}

	private static UploadXPower(message: RMCMessage): typeof Methods.UploadXPower.Request | typeof Methods.UploadXPower.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadXPower.Request;
		} else {
			return Methods.UploadXPower.Response;
		}
	}

	private static GetXPowerRanking(message: RMCMessage): typeof Methods.GetXPowerRanking.Request | typeof Methods.GetXPowerRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetXPowerRanking.Request;
		} else {
			return Methods.GetXPowerRanking.Response;
		}
	}

	private static UploadEventMatchResult(message: RMCMessage): typeof Methods.UploadEventMatchResult.Request | typeof Methods.UploadEventMatchResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadEventMatchResult.Request;
		} else {
			return Methods.UploadEventMatchResult.Response;
		}
	}

	private static GetEventMatchResult(message: RMCMessage): typeof Methods.GetEventMatchResult.Request | typeof Methods.GetEventMatchResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetEventMatchResult.Request;
		} else {
			return Methods.GetEventMatchResult.Response;
		}
	}

	private static AcquireEventMatchRight(message: RMCMessage): typeof Methods.AcquireEventMatchRight.Request | typeof Methods.AcquireEventMatchRight.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AcquireEventMatchRight.Request;
		} else {
			return Methods.AcquireEventMatchRight.Response;
		}
	}
}
