import RMCMessage from '@/nex/rmc-message';
import Ranking2Protocol from '@/nex/protocols/ranking-2';
import * as Methods from '@/nex/protocols/ranking-2/mario-strikers-battle-league/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class Ranking2ProtocolMarioStrikersBattleLeague {
	static ID = 0x7A;
	static Name = 'Ranking2 (Mario Strikers: Battle League)';

	static Methods = {
		GetClubRanking: 0x0B,
		GetClubRankingById: 0x0C,
		PutCommonClubData: 0x0D,
		GetCommonClubData: 0x0E,
		GetCommonClubDataMulti: 0x0F
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x0B: Ranking2ProtocolMarioStrikersBattleLeague.GetClubRanking,
		0x0C: Ranking2ProtocolMarioStrikersBattleLeague.GetClubRankingById,
		0x0D: Ranking2ProtocolMarioStrikersBattleLeague.PutCommonClubData,
		0x0E: Ranking2ProtocolMarioStrikersBattleLeague.GetCommonClubData,
		0x0F: Ranking2ProtocolMarioStrikersBattleLeague.GetCommonClubDataMulti
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = Ranking2ProtocolMarioStrikersBattleLeague.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			Ranking2Protocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static GetClubRanking(message: RMCMessage): typeof Methods.GetClubRanking.Request | typeof Methods.GetClubRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetClubRanking.Request;
		} else {
			return Methods.GetClubRanking.Response;
		}
	}

	private static GetClubRankingById(message: RMCMessage): typeof Methods.GetClubRankingById.Request | typeof Methods.GetClubRankingById.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetClubRankingById.Request;
		} else {
			return Methods.GetClubRankingById.Response;
		}
	}

	private static PutCommonClubData(message: RMCMessage): typeof Methods.PutCommonClubData.Request | typeof Methods.PutCommonClubData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PutCommonClubData.Request;
		} else {
			return Methods.PutCommonClubData.Response;
		}
	}

	private static GetCommonClubData(message: RMCMessage): typeof Methods.GetCommonClubData.Request | typeof Methods.GetCommonClubData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCommonClubData.Request;
		} else {
			return Methods.GetCommonClubData.Response;
		}
	}

	private static GetCommonClubDataMulti(message: RMCMessage): typeof Methods.GetCommonClubDataMulti.Request | typeof Methods.GetCommonClubDataMulti.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCommonClubDataMulti.Request;
		} else {
			return Methods.GetCommonClubDataMulti.Response;
		}
	}
}
