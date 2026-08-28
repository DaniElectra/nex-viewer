import RMCMessage from '@/nex/rmc-message';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import * as Methods from '@/nex/protocols/matchmake-extension/xenoblade-chronicles-x/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class MatchmakeExtensionProtocolXenobladeChroniclesX {
	static ID = 0x6D;
	static Name = 'MatchmakeExtension (Xenoblade Chronicles X)';

	static Methods = {
		JoinCommunityReturnJoinId: 0x24,
		SearchPersistentGathering: 0x25,
		GetMatchmakeExtensionSetting: 0x26,
		CustomAutoMatchmake_Postpone: 0x27,
		CustomAutoMatchmakeWithSearchCriteria_Postpone: 0x28,
		CustomJoinMatchmakeSessionEx: 0x29
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x24: MatchmakeExtensionProtocolXenobladeChroniclesX.JoinCommunityReturnJoinId,
		0x25: MatchmakeExtensionProtocolXenobladeChroniclesX.SearchPersistentGathering,
		0x26: MatchmakeExtensionProtocolXenobladeChroniclesX.GetMatchmakeExtensionSetting,
		0x27: MatchmakeExtensionProtocolXenobladeChroniclesX.CustomAutoMatchmake_Postpone,
		0x28: MatchmakeExtensionProtocolXenobladeChroniclesX.CustomAutoMatchmakeWithSearchCriteria_Postpone,
		0x29: MatchmakeExtensionProtocolXenobladeChroniclesX.CustomJoinMatchmakeSessionEx
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeExtensionProtocolXenobladeChroniclesX.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			MatchmakeExtensionProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static JoinCommunityReturnJoinId(message: RMCMessage): typeof Methods.JoinCommunityReturnJoinId.Request | typeof Methods.JoinCommunityReturnJoinId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.JoinCommunityReturnJoinId.Request;
		} else {
			return Methods.JoinCommunityReturnJoinId.Response;
		}
	}

	private static SearchPersistentGathering(message: RMCMessage): typeof Methods.SearchPersistentGathering.Request | typeof Methods.SearchPersistentGathering.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchPersistentGathering.Request;
		} else {
			return Methods.SearchPersistentGathering.Response;
		}
	}

	private static GetMatchmakeExtensionSetting(message: RMCMessage): typeof Methods.GetMatchmakeExtensionSetting.Request | typeof Methods.GetMatchmakeExtensionSetting.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetMatchmakeExtensionSetting.Request;
		} else {
			return Methods.GetMatchmakeExtensionSetting.Response;
		}
	}

	private static CustomAutoMatchmake_Postpone(message: RMCMessage): typeof Methods.CustomAutoMatchmake_Postpone.Request | typeof Methods.CustomAutoMatchmake_Postpone.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CustomAutoMatchmake_Postpone.Request;
		} else {
			return Methods.CustomAutoMatchmake_Postpone.Response;
		}
	}

	private static CustomAutoMatchmakeWithSearchCriteria_Postpone(message: RMCMessage): typeof Methods.CustomAutoMatchmakeWithSearchCriteria_Postpone.Request | typeof Methods.CustomAutoMatchmakeWithSearchCriteria_Postpone.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CustomAutoMatchmakeWithSearchCriteria_Postpone.Request;
		} else {
			return Methods.CustomAutoMatchmakeWithSearchCriteria_Postpone.Response;
		}
	}

	private static CustomJoinMatchmakeSessionEx(message: RMCMessage): typeof Methods.CustomJoinMatchmakeSessionEx.Request | typeof Methods.CustomJoinMatchmakeSessionEx.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CustomJoinMatchmakeSessionEx.Request;
		} else {
			return Methods.CustomJoinMatchmakeSessionEx.Response;
		}
	}
}
