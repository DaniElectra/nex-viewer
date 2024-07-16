import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/matchmake-extension/methods';
import type Packet from '@/types/nex/packet';

export default class MatchmakeExtensionProtocol {
	static ID = 0x6D;
	static Name = 'MatchmakeExtension';

	static Methods = {
		CloseParticipation: 0x1,
		OpenParticipation: 0x2,
		AutoMatchmake_Postpone: 0x3,
		BrowseMatchmakeSession: 0x4,
		BrowseMatchmakeSessionWithHostUrls: 0x5,
		CreateMatchmakeSession: 0x6,
		JoinMatchmakeSession: 0x7,
		ModifyCurrentGameAttribute: 0x8,
		UpdateNotificationData: 0x9,
		GetFriendNotificationData: 0xA,
		UpdateApplicationBuffer: 0xB,
		UpdateMatchmakeSessionAttribute: 0xC,
		GetlstFriendNotificationData: 0xD,
		UpdateMatchmakeSession: 0xE,
		AutoMatchmakeWithSearchCriteria_Postpone: 0xF,
		GetPlayingSession: 0x10,
		CreateCommunity: 0x11,
		UpdateCommunity: 0x12,
		JoinCommunity: 0x13,
		FindCommunityByGatheringId: 0x14,
		FindOfficialCommunity: 0x15,
		FindCommunityByParticipant: 0x16,
		UpdatePrivacySetting: 0x17,
		GetMyBlackList: 0x18,
		AddToBlackList: 0x19,
		RemoveFromBlackList: 0x1A,
		ClearMyBlackList: 0x1B,
		ReportViolation: 0x1C,
		IsViolationUser: 0x1D,
		JoinMatchmakeSessionEx: 0x1E,
		GetSimplePlayingSession: 0x1F,
		GetSimpleCommunity: 0x20,
		AutoMatchmakeWithGatheringId_Postpone: 0x21,
		UpdateProgressScore: 0x22,
		DebugNotifyEvent: 0x23,
		GenerateMatchmakeSessionSystemPassword: 0x24,
		ClearMatchmakeSessionSystemPassword: 0x25,
		CreateMatchmakeSessionWithParam: 0x26,
		JoinMatchmakeSessionWithParam: 0x27,
		AutoMatchmakeWithParam_Postpone: 0x28,
		FindMatchmakeSessionByGatheringIdDetail: 0x29,
		BrowseMatchmakeSessionNoHolder: 0x2A,
		BrowseMatchmakeSessionWithHostUrlsNoHolder: 0x2B,
		UpdateMatchmakeSessionPart: 0x2C,
		RequestMatchmakeExtension: 0x2D,
		WithdrawMatchmakeExtension: 0x2E,
		WithdrawMatchmakeExtensionAll: 0x2F,
		FindMatchmakeSessionByGatheringId: 0x30,
		FindMatchmakeSessionBySingleGatheringId: 0x31,
		FindMatchmakeSessionByOwner: 0x32,
		FindMatchmakeSessionByParticipant: 0x33,
		BrowseMatchmakeSessionNoHolderNoResultRange: 0x34,
		BrowseMatchmakeSessionWithHostUrlsNoHolderNoResultRange: 0x35,
		FindCommunityByOwner: 0x36
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: MatchmakeExtensionProtocol.CloseParticipation,
		0x10: MatchmakeExtensionProtocol.GetPlayingSession,
		0x1F: MatchmakeExtensionProtocol.GetSimplePlayingSession,
		0x22: MatchmakeExtensionProtocol.UpdateProgressScore,
		0x28: MatchmakeExtensionProtocol.AutoMatchmakeWithParam_Postpone
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeExtensionProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
	}

	private static CloseParticipation(message: RMCMessage): typeof Methods.CloseParticipation.Request | typeof Methods.CloseParticipation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CloseParticipation.Request;
		} else {
			return Methods.CloseParticipation.Response;
		}
	}

	private static GetPlayingSession(message: RMCMessage): typeof Methods.GetPlayingSession.Request | typeof Methods.GetPlayingSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPlayingSession.Request;
		} else {
			return Methods.GetPlayingSession.Response;
		}
	}

	private static GetSimplePlayingSession(message: RMCMessage): typeof Methods.GetSimplePlayingSession.Request | typeof Methods.GetSimplePlayingSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSimplePlayingSession.Request;
		} else {
			return Methods.GetSimplePlayingSession.Response;
		}
	}

	private static UpdateProgressScore(message: RMCMessage): typeof Methods.UpdateProgressScore.Request | typeof Methods.UpdateProgressScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateProgressScore.Request;
		} else {
			return Methods.UpdateProgressScore.Response;
		}
	}

	private static AutoMatchmakeWithParam_Postpone(message: RMCMessage): typeof Methods.AutoMatchmakeWithParam_Postpone.Request | typeof Methods.AutoMatchmakeWithParam_Postpone.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AutoMatchmakeWithParam_Postpone.Request;
		} else {
			return Methods.AutoMatchmakeWithParam_Postpone.Response;
		}
	}
}