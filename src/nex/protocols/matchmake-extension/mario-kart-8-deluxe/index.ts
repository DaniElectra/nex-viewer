import RMCMessage from '@/nex/rmc-message';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import * as Methods from '@/nex/protocols/matchmake-extension/mario-kart-8-deluxe/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class MatchmakeExtensionProtocolMarioKart8Deluxe {
	static ID = 0x6D;
	static Name = 'MatchmakeExtension (Mario Kart 8 Deluxe)';

	static Methods = {
		CreateSimpleSearchObject: 0x36,
		UpdateSimpleSearchObject: 0x37,
		DeleteSimpleSearchObject: 0x38,
		SearchSimpleSearchObject: 0x39,
		SearchSimpleSearchObjectByObjectIds: 0x3A,
		JoinMatchmakeSessionWithExtraParticipants: 0x3B,
		CustomGetSimplePlayingSession: 0x3C,
		CreateCompetition: 0x3D,
		DeleteCompetition: 0x3E,
		RegisterFavoriteCompetition: 0x3F,
		UnregisterFavoriteCompetition: 0x40,
		GetFavoriteCompetition: 0x41,
		GetTeamParticipants: 0x42,
		FindCommunityByOwner: 0x43,
		UnknownMethod0x44: 0x44,
		UnknownMethod0x45: 0x45
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x36: MatchmakeExtensionProtocolMarioKart8Deluxe.CreateSimpleSearchObject,
		0x37: MatchmakeExtensionProtocolMarioKart8Deluxe.UpdateSimpleSearchObject,
		0x38: MatchmakeExtensionProtocolMarioKart8Deluxe.DeleteSimpleSearchObject,
		0x39: MatchmakeExtensionProtocolMarioKart8Deluxe.SearchSimpleSearchObject,
		0x3A: MatchmakeExtensionProtocolMarioKart8Deluxe.SearchSimpleSearchObjectByObjectIds,
		0x3B: MatchmakeExtensionProtocolMarioKart8Deluxe.JoinMatchmakeSessionWithExtraParticipants,
		0x3C: MatchmakeExtensionProtocolMarioKart8Deluxe.CustomGetSimplePlayingSession,
		0x3D: MatchmakeExtensionProtocolMarioKart8Deluxe.CreateCompetition,
		0x3E: MatchmakeExtensionProtocolMarioKart8Deluxe.DeleteCompetition,
		0x3F: MatchmakeExtensionProtocolMarioKart8Deluxe.RegisterFavoriteCompetition,
		0x40: MatchmakeExtensionProtocolMarioKart8Deluxe.UnregisterFavoriteCompetition,
		0x41: MatchmakeExtensionProtocolMarioKart8Deluxe.GetFavoriteCompetition,
		0x42: MatchmakeExtensionProtocolMarioKart8Deluxe.GetTeamParticipants,
		0x43: MatchmakeExtensionProtocolMarioKart8Deluxe.FindCommunityByOwner,
		0x44: MatchmakeExtensionProtocolMarioKart8Deluxe.UnknownMethod0x44,
		0x45: MatchmakeExtensionProtocolMarioKart8Deluxe.UnknownMethod0x45
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeExtensionProtocolMarioKart8Deluxe.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			MatchmakeExtensionProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static CreateSimpleSearchObject(message: RMCMessage): typeof Methods.CreateSimpleSearchObject.Request | typeof Methods.CreateSimpleSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CreateSimpleSearchObject.Request;
		} else {
			return Methods.CreateSimpleSearchObject.Response;
		}
	}

	private static UpdateSimpleSearchObject(message: RMCMessage): typeof Methods.UpdateSimpleSearchObject.Request | typeof Methods.UpdateSimpleSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateSimpleSearchObject.Request;
		} else {
			return Methods.UpdateSimpleSearchObject.Response;
		}
	}

	private static DeleteSimpleSearchObject(message: RMCMessage): typeof Methods.DeleteSimpleSearchObject.Request | typeof Methods.DeleteSimpleSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteSimpleSearchObject.Request;
		} else {
			return Methods.DeleteSimpleSearchObject.Response;
		}
	}

	private static SearchSimpleSearchObject(message: RMCMessage): typeof Methods.SearchSimpleSearchObject.Request | typeof Methods.SearchSimpleSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchSimpleSearchObject.Request;
		} else {
			return Methods.SearchSimpleSearchObject.Response;
		}
	}

	private static SearchSimpleSearchObjectByObjectIds(message: RMCMessage): typeof Methods.SearchSimpleSearchObjectByObjectIds.Request | typeof Methods.SearchSimpleSearchObjectByObjectIds.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchSimpleSearchObjectByObjectIds.Request;
		} else {
			return Methods.SearchSimpleSearchObjectByObjectIds.Response;
		}
	}

	private static JoinMatchmakeSessionWithExtraParticipants(message: RMCMessage): typeof Methods.JoinMatchmakeSessionWithExtraParticipants.Request | typeof Methods.JoinMatchmakeSessionWithExtraParticipants.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.JoinMatchmakeSessionWithExtraParticipants.Request;
		} else {
			return Methods.JoinMatchmakeSessionWithExtraParticipants.Response;
		}
	}

	private static CustomGetSimplePlayingSession(message: RMCMessage): typeof Methods.CustomGetSimplePlayingSession.Request | typeof Methods.CustomGetSimplePlayingSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CustomGetSimplePlayingSession.Request;
		} else {
			return Methods.CustomGetSimplePlayingSession.Response;
		}
	}

	private static CreateCompetition(message: RMCMessage): typeof Methods.CreateCompetition.Request | typeof Methods.CreateCompetition.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CreateCompetition.Request;
		} else {
			return Methods.CreateCompetition.Response;
		}
	}

	private static DeleteCompetition(message: RMCMessage): typeof Methods.DeleteCompetition.Request | typeof Methods.DeleteCompetition.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteCompetition.Request;
		} else {
			return Methods.DeleteCompetition.Response;
		}
	}

	private static RegisterFavoriteCompetition(message: RMCMessage): typeof Methods.RegisterFavoriteCompetition.Request | typeof Methods.RegisterFavoriteCompetition.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RegisterFavoriteCompetition.Request;
		} else {
			return Methods.RegisterFavoriteCompetition.Response;
		}
	}

	private static UnregisterFavoriteCompetition(message: RMCMessage): typeof Methods.UnregisterFavoriteCompetition.Request | typeof Methods.UnregisterFavoriteCompetition.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnregisterFavoriteCompetition.Request;
		} else {
			return Methods.UnregisterFavoriteCompetition.Response;
		}
	}

	private static GetFavoriteCompetition(message: RMCMessage): typeof Methods.GetFavoriteCompetition.Request | typeof Methods.GetFavoriteCompetition.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFavoriteCompetition.Request;
		} else {
			return Methods.GetFavoriteCompetition.Response;
		}
	}

	private static GetTeamParticipants(message: RMCMessage): typeof Methods.GetTeamParticipants.Request | typeof Methods.GetTeamParticipants.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetTeamParticipants.Request;
		} else {
			return Methods.GetTeamParticipants.Response;
		}
	}

	private static FindCommunityByOwner(message: RMCMessage): typeof Methods.FindCommunityByOwner.Request | typeof Methods.FindCommunityByOwner.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindCommunityByOwner.Request;
		} else {
			return Methods.FindCommunityByOwner.Response;
		}
	}

	private static UnknownMethod0x44(message: RMCMessage): typeof Methods.UnknownMethod0x44.Request | typeof Methods.UnknownMethod0x44.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x44.Request;
		} else {
			return Methods.UnknownMethod0x44.Response;
		}
	}

	private static UnknownMethod0x45(message: RMCMessage): typeof Methods.UnknownMethod0x45.Request | typeof Methods.UnknownMethod0x45.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x45.Request;
		} else {
			return Methods.UnknownMethod0x45.Response;
		}
	}
}
