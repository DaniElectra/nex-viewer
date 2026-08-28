import RMCMessage from '@/nex/rmc-message';
import UtilityProtocol from '@/nex/protocols/utility';
import * as Methods from '@/nex/protocols/utility/mario-strikers-battle-league/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class UtilityProtocolMarioStrikersBattleLeague {
	static ID = 0x6E;
	static Name = 'Utility (Mario Strikers: Battle League)';

	static Methods = {
		GetPlayer: 0x9,
		GetClubCurrentStatus: 0xA,
		GetCurrentOrNextSession: 0xB
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x9: UtilityProtocolMarioStrikersBattleLeague.GetPlayer,
		0xA: UtilityProtocolMarioStrikersBattleLeague.GetClubCurrentStatus,
		0xB: UtilityProtocolMarioStrikersBattleLeague.GetCurrentOrNextSession
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = UtilityProtocolMarioStrikersBattleLeague.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			UtilityProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static GetPlayer(message: RMCMessage): typeof Methods.GetPlayer.Request | typeof Methods.GetPlayer.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPlayer.Request;
		} else {
			return Methods.GetPlayer.Response;
		}
	}

	private static GetClubCurrentStatus(message: RMCMessage): typeof Methods.GetClubCurrentStatus.Request | typeof Methods.GetClubCurrentStatus.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetClubCurrentStatus.Request;
		} else {
			return Methods.GetClubCurrentStatus.Response;
		}
	}

	private static GetCurrentOrNextSession(message: RMCMessage): typeof Methods.GetCurrentOrNextSession.Request | typeof Methods.GetCurrentOrNextSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCurrentOrNextSession.Request;
		} else {
			return Methods.GetCurrentOrNextSession.Response;
		}
	}
}
