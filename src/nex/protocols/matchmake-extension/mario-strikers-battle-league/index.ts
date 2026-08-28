import RMCMessage from '@/nex/rmc-message';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import * as Methods from '@/nex/protocols/matchmake-extension/mario-strikers-battle-league/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class MatchmakeExtensionProtocolMarioStrikersBattleLeague {
	static ID = 0x6D;
	static Name = 'MatchmakeExtension (Mario Strikers: Battle League)';

	static Methods = {
		CreateClub: 0x37,
		JoinClub: 0x38,
		BrowseClub: 0x39,
		UpdateClub: 0x3A,
		FindClubByGatheringId: 0x3B,
		FindClubByGatheringIdList: 0x3C,
		FindClubByParticipant: 0x3D,
		GetOrCreatePlayer: 0x3E,
		GetClubPlayer: 0x3F,
		GetPlayer: 0x40,
		UpdatePlayer: 0x41,
		SendRequestToJoin: 0x42,
		GetRequestToJoin: 0x43,
		AcceptRequestToJoin: 0x44,
		RejectRequestToJoin: 0x45,
		GetRequestToJoinSendByMyself: 0x46,
		CancelRequestToJoin: 0x47,
		GetClubCurrentStatus: 0x48,
		GetRecommendedClub: 0x49,
		GetCurrentOrNextSession: 0x4A,
		GetLatestSession: 0x4B,
		GetSeasonGroup: 0x4C,
		PostSeasonAchievement: 0x4D,
		CompleteSeasonAchievement: 0x4E,
		GetSeasonAchievement: 0x4F,
		GetSeasonGroupEstimateResult: 0x50,
		SetConstructionTarget: 0x51,
		GetConstructionTarget: 0x52,
		GetClubUpdate: 0x53,
		GetCurrentPersonalRatingCategory: 0x54,
		MarkFavoriteConstructionTarget: 0x55,
		UnmarkFavoriteConstructionTarget: 0x56,
		UpdateClubForDebug: 0x57,
		RemoveClubMember: 0x58,
		ProcessTentativeRemoval: 0x59,
		GetServerSetting: 0x5A,
		GetRecommendedRegion: 0x5B
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x37: MatchmakeExtensionProtocolMarioStrikersBattleLeague.CreateClub,
		0x38: MatchmakeExtensionProtocolMarioStrikersBattleLeague.JoinClub,
		0x39: MatchmakeExtensionProtocolMarioStrikersBattleLeague.BrowseClub,
		0x3A: MatchmakeExtensionProtocolMarioStrikersBattleLeague.UpdateClub,
		0x3B: MatchmakeExtensionProtocolMarioStrikersBattleLeague.FindClubByGatheringId,
		0x3C: MatchmakeExtensionProtocolMarioStrikersBattleLeague.FindClubByGatheringIdList,
		0x3D: MatchmakeExtensionProtocolMarioStrikersBattleLeague.FindClubByParticipant,
		0x3E: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetOrCreatePlayer,
		0x3F: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetClubPlayer,
		0x40: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetPlayer,
		0x41: MatchmakeExtensionProtocolMarioStrikersBattleLeague.UpdatePlayer,
		0x42: MatchmakeExtensionProtocolMarioStrikersBattleLeague.SendRequestToJoin,
		0x43: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetRequestToJoin,
		0x44: MatchmakeExtensionProtocolMarioStrikersBattleLeague.AcceptRequestToJoin,
		0x45: MatchmakeExtensionProtocolMarioStrikersBattleLeague.RejectRequestToJoin,
		0x46: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetRequestToJoinSendByMyself,
		0x47: MatchmakeExtensionProtocolMarioStrikersBattleLeague.CancelRequestToJoin,
		0x48: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetClubCurrentStatus,
		0x49: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetRecommendedClub,
		0x4A: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetCurrentOrNextSession,
		0x4B: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetLatestSession,
		0x4C: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetSeasonGroup,
		0x4D: MatchmakeExtensionProtocolMarioStrikersBattleLeague.PostSeasonAchievement,
		0x4E: MatchmakeExtensionProtocolMarioStrikersBattleLeague.CompleteSeasonAchievement,
		0x4F: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetSeasonAchievement,
		0x50: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetSeasonGroupEstimateResult,
		0x51: MatchmakeExtensionProtocolMarioStrikersBattleLeague.SetConstructionTarget,
		0x52: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetConstructionTarget,
		0x53: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetClubUpdate,
		0x54: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetCurrentPersonalRatingCategory,
		0x55: MatchmakeExtensionProtocolMarioStrikersBattleLeague.MarkFavoriteConstructionTarget,
		0x56: MatchmakeExtensionProtocolMarioStrikersBattleLeague.UnmarkFavoriteConstructionTarget,
		0x57: MatchmakeExtensionProtocolMarioStrikersBattleLeague.UpdateClubForDebug,
		0x58: MatchmakeExtensionProtocolMarioStrikersBattleLeague.RemoveClubMember,
		0x59: MatchmakeExtensionProtocolMarioStrikersBattleLeague.ProcessTentativeRemoval,
		0x5A: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetServerSetting,
		0x5B: MatchmakeExtensionProtocolMarioStrikersBattleLeague.GetRecommendedRegion
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeExtensionProtocolMarioStrikersBattleLeague.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			MatchmakeExtensionProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static CreateClub(message: RMCMessage): typeof Methods.CreateClub.Request | typeof Methods.CreateClub.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CreateClub.Request;
		} else {
			return Methods.CreateClub.Response;
		}
	}

	private static JoinClub(message: RMCMessage): typeof Methods.JoinClub.Request | typeof Methods.JoinClub.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.JoinClub.Request;
		} else {
			return Methods.JoinClub.Response;
		}
	}

	private static BrowseClub(message: RMCMessage): typeof Methods.BrowseClub.Request | typeof Methods.BrowseClub.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.BrowseClub.Request;
		} else {
			return Methods.BrowseClub.Response;
		}
	}

	private static UpdateClub(message: RMCMessage): typeof Methods.UpdateClub.Request | typeof Methods.UpdateClub.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateClub.Request;
		} else {
			return Methods.UpdateClub.Response;
		}
	}

	private static FindClubByGatheringId(message: RMCMessage): typeof Methods.FindClubByGatheringId.Request | typeof Methods.FindClubByGatheringId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindClubByGatheringId.Request;
		} else {
			return Methods.FindClubByGatheringId.Response;
		}
	}

	private static FindClubByGatheringIdList(message: RMCMessage): typeof Methods.FindClubByGatheringIdList.Request | typeof Methods.FindClubByGatheringIdList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindClubByGatheringIdList.Request;
		} else {
			return Methods.FindClubByGatheringIdList.Response;
		}
	}

	private static FindClubByParticipant(message: RMCMessage): typeof Methods.FindClubByParticipant.Request | typeof Methods.FindClubByParticipant.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindClubByParticipant.Request;
		} else {
			return Methods.FindClubByParticipant.Response;
		}
	}

	private static GetOrCreatePlayer(message: RMCMessage): typeof Methods.GetOrCreatePlayer.Request | typeof Methods.GetOrCreatePlayer.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetOrCreatePlayer.Request;
		} else {
			return Methods.GetOrCreatePlayer.Response;
		}
	}

	private static GetClubPlayer(message: RMCMessage): typeof Methods.GetClubPlayer.Request | typeof Methods.GetClubPlayer.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetClubPlayer.Request;
		} else {
			return Methods.GetClubPlayer.Response;
		}
	}

	private static GetPlayer(message: RMCMessage): typeof Methods.GetPlayer.Request | typeof Methods.GetPlayer.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPlayer.Request;
		} else {
			return Methods.GetPlayer.Response;
		}
	}

	private static UpdatePlayer(message: RMCMessage): typeof Methods.UpdatePlayer.Request | typeof Methods.UpdatePlayer.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdatePlayer.Request;
		} else {
			return Methods.UpdatePlayer.Response;
		}
	}

	private static SendRequestToJoin(message: RMCMessage): typeof Methods.SendRequestToJoin.Request | typeof Methods.SendRequestToJoin.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SendRequestToJoin.Request;
		} else {
			return Methods.SendRequestToJoin.Response;
		}
	}

	private static GetRequestToJoin(message: RMCMessage): typeof Methods.GetRequestToJoin.Request | typeof Methods.GetRequestToJoin.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRequestToJoin.Request;
		} else {
			return Methods.GetRequestToJoin.Response;
		}
	}

	private static AcceptRequestToJoin(message: RMCMessage): typeof Methods.AcceptRequestToJoin.Request | typeof Methods.AcceptRequestToJoin.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AcceptRequestToJoin.Request;
		} else {
			return Methods.AcceptRequestToJoin.Response;
		}
	}

	private static RejectRequestToJoin(message: RMCMessage): typeof Methods.RejectRequestToJoin.Request | typeof Methods.RejectRequestToJoin.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RejectRequestToJoin.Request;
		} else {
			return Methods.RejectRequestToJoin.Response;
		}
	}

	private static GetRequestToJoinSendByMyself(message: RMCMessage): typeof Methods.GetRequestToJoinSendByMyself.Request | typeof Methods.GetRequestToJoinSendByMyself.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRequestToJoinSendByMyself.Request;
		} else {
			return Methods.GetRequestToJoinSendByMyself.Response;
		}
	}

	private static CancelRequestToJoin(message: RMCMessage): typeof Methods.CancelRequestToJoin.Request | typeof Methods.CancelRequestToJoin.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CancelRequestToJoin.Request;
		} else {
			return Methods.CancelRequestToJoin.Response;
		}
	}

	private static GetClubCurrentStatus(message: RMCMessage): typeof Methods.GetClubCurrentStatus.Request | typeof Methods.GetClubCurrentStatus.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetClubCurrentStatus.Request;
		} else {
			return Methods.GetClubCurrentStatus.Response;
		}
	}

	private static GetRecommendedClub(message: RMCMessage): typeof Methods.GetRecommendedClub.Request | typeof Methods.GetRecommendedClub.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRecommendedClub.Request;
		} else {
			return Methods.GetRecommendedClub.Response;
		}
	}

	private static GetCurrentOrNextSession(message: RMCMessage): typeof Methods.GetCurrentOrNextSession.Request | typeof Methods.GetCurrentOrNextSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCurrentOrNextSession.Request;
		} else {
			return Methods.GetCurrentOrNextSession.Response;
		}
	}

	private static GetLatestSession(message: RMCMessage): typeof Methods.GetLatestSession.Request | typeof Methods.GetLatestSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetLatestSession.Request;
		} else {
			return Methods.GetLatestSession.Response;
		}
	}

	private static GetSeasonGroup(message: RMCMessage): typeof Methods.GetSeasonGroup.Request | typeof Methods.GetSeasonGroup.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSeasonGroup.Request;
		} else {
			return Methods.GetSeasonGroup.Response;
		}
	}

	private static PostSeasonAchievement(message: RMCMessage): typeof Methods.PostSeasonAchievement.Request | typeof Methods.PostSeasonAchievement.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostSeasonAchievement.Request;
		} else {
			return Methods.PostSeasonAchievement.Response;
		}
	}

	private static CompleteSeasonAchievement(message: RMCMessage): typeof Methods.CompleteSeasonAchievement.Request | typeof Methods.CompleteSeasonAchievement.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompleteSeasonAchievement.Request;
		} else {
			return Methods.CompleteSeasonAchievement.Response;
		}
	}

	private static GetSeasonAchievement(message: RMCMessage): typeof Methods.GetSeasonAchievement.Request | typeof Methods.GetSeasonAchievement.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSeasonAchievement.Request;
		} else {
			return Methods.GetSeasonAchievement.Response;
		}
	}

	private static GetSeasonGroupEstimateResult(message: RMCMessage): typeof Methods.GetSeasonGroupEstimateResult.Request | typeof Methods.GetSeasonGroupEstimateResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSeasonGroupEstimateResult.Request;
		} else {
			return Methods.GetSeasonGroupEstimateResult.Response;
		}
	}

	private static SetConstructionTarget(message: RMCMessage): typeof Methods.SetConstructionTarget.Request | typeof Methods.SetConstructionTarget.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SetConstructionTarget.Request;
		} else {
			return Methods.SetConstructionTarget.Response;
		}
	}

	private static GetConstructionTarget(message: RMCMessage): typeof Methods.GetConstructionTarget.Request | typeof Methods.GetConstructionTarget.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetConstructionTarget.Request;
		} else {
			return Methods.GetConstructionTarget.Response;
		}
	}

	private static GetClubUpdate(message: RMCMessage): typeof Methods.GetClubUpdate.Request | typeof Methods.GetClubUpdate.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetClubUpdate.Request;
		} else {
			return Methods.GetClubUpdate.Response;
		}
	}

	private static GetCurrentPersonalRatingCategory(message: RMCMessage): typeof Methods.GetCurrentPersonalRatingCategory.Request | typeof Methods.GetCurrentPersonalRatingCategory.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCurrentPersonalRatingCategory.Request;
		} else {
			return Methods.GetCurrentPersonalRatingCategory.Response;
		}
	}

	private static MarkFavoriteConstructionTarget(message: RMCMessage): typeof Methods.MarkFavoriteConstructionTarget.Request | typeof Methods.MarkFavoriteConstructionTarget.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.MarkFavoriteConstructionTarget.Request;
		} else {
			return Methods.MarkFavoriteConstructionTarget.Response;
		}
	}

	private static UnmarkFavoriteConstructionTarget(message: RMCMessage): typeof Methods.UnmarkFavoriteConstructionTarget.Request | typeof Methods.UnmarkFavoriteConstructionTarget.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnmarkFavoriteConstructionTarget.Request;
		} else {
			return Methods.UnmarkFavoriteConstructionTarget.Response;
		}
	}

	private static UpdateClubForDebug(message: RMCMessage): typeof Methods.UpdateClubForDebug.Request | typeof Methods.UpdateClubForDebug.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateClubForDebug.Request;
		} else {
			return Methods.UpdateClubForDebug.Response;
		}
	}

	private static RemoveClubMember(message: RMCMessage): typeof Methods.RemoveClubMember.Request | typeof Methods.RemoveClubMember.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RemoveClubMember.Request;
		} else {
			return Methods.RemoveClubMember.Response;
		}
	}

	private static ProcessTentativeRemoval(message: RMCMessage): typeof Methods.ProcessTentativeRemoval.Request | typeof Methods.ProcessTentativeRemoval.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ProcessTentativeRemoval.Request;
		} else {
			return Methods.ProcessTentativeRemoval.Response;
		}
	}

	private static GetServerSetting(message: RMCMessage): typeof Methods.GetServerSetting.Request | typeof Methods.GetServerSetting.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetServerSetting.Request;
		} else {
			return Methods.GetServerSetting.Response;
		}
	}

	private static GetRecommendedRegion(message: RMCMessage): typeof Methods.GetRecommendedRegion.Request | typeof Methods.GetRecommendedRegion.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRecommendedRegion.Request;
		} else {
			return Methods.GetRecommendedRegion.Response;
		}
	}
}
