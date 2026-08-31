import RMCMessage from '@/nex/rmc-message';
import DataStoreProtocol from '@/nex/protocols/datastore';
import * as Methods from '@/nex/protocols/datastore/super-mario-maker-2/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class DataStoreProtocolSuperMarioMaker2 {
	static ID = 0x73;
	static Name = 'DataStore (Super Mario Maker 2)';

	static Methods = {
		RegisterUser: 0x2F,
		GetUsers: 0x30,
		SyncUserProfile: 0x31,
		SearchUsersUserPoint: 0x32,
		SearchUsersEndlessMode: 0x33,
		SearchUsersBattleMode: 0x34,
		SearchUsersPlayedCourse: 0x35,
		SearchUsersClearedCourse: 0x36,
		SearchUsersPositiveRatedCourse: 0x37,
		SearchUsersFollowee: 0x38,
		SearchUsersClearRanking: 0x39,
		SearchUsersTermsRanking: 0x3A,
		UpdateLastLoginTime: 0x3B,
		CanPostCourse: 0x3C,
		CanPostRatingAndComment: 0x3D,
		UpdateMiiClothes: 0x3E,
		GetMiiClothes: 0x3F,
		PostActivityQuest: 0x40,
		GetUserNameNgType: 0x41,
		PreparePostObjectCourse: 0x42,
		CompletePostObjectCourse: 0x43,
		CompletePostObjectsCourse: 0x44,
		UpdateCourseTag: 0x45,
		GetCourses: 0x46,
		SearchCoursesPointRanking: 0x47,
		SearchCoursesAdvanced: 0x48,
		SearchCoursesLatest: 0x49,
		SearchCoursesPostedBy: 0x4A,
		SearchCoursesPositiveRatedBy: 0x4B,
		SearchCoursesPlayedBy: 0x4C,
		SearchCoursesBattleMode: 0x4D,
		SearchCoursesBattleModeByDifficulty: 0x4E,
		SearchCoursesEndlessMode: 0x4F,
		SearchCoursesFirstClear: 0x50,
		SearchCoursesBestTime: 0x51,
		SearchCoursesFolloweePostedBy: 0x52,
		SearchCoursesTermsRanking: 0x53,
		SearchCoursesPickUp: 0x54,
		GetCoursesEvent: 0x55,
		SearchCoursesEvent: 0x56,
		ReadEventCourseList: 0x57,
		PreparePostObjectCommentPicture: 0x58,
		CompletePostObjectCommentPicture: 0x59,
		CompletePostObjectsCommentPicture: 0x5A,
		PostCommentText: 0x5B,
		PostCommentStamp: 0x5C,
		DeleteComment: 0x5D,
		SearchCommentsInOrder: 0x5E,
		SearchComments: 0x5F,
		PostPlayResult: 0x60,
		PostPlayResults: 0x61,
		PostPlayResultsAccumulated: 0x62,
		PostPlayResultBattleModePersonal: 0x63,
		PostPlayResultBattleModeEntire: 0x64,
		PostPlayResultMultiClear: 0x65,
		PostPlayResultEventCourse: 0x66,
		GetDeathPositions: 0x67,
		PostRatingInfo: 0x68,
		PostRatingInfos: 0x69,
		PostRatingInfoBattleModePersonal: 0x6A,
		PostRatingInfoBattleModeEntire: 0x6B,
		GetEndlessModeStatus: 0x6C,
		InitEndlessMode: 0x6D,
		StartEndlessModeCourse: 0x6E,
		DominateEndlessModeCourse: 0x6F,
		PassEndlessModeCourse: 0x70,
		SuspendEndlessMode: 0x71,
		FinishEndlessMode: 0x72,
		GetEndlessModePlayInfo: 0x73,
		GetEndlessModeRank: 0x74,
		GetBattleModeRating: 0x75,
		StartBattleMode: 0x76,
		EndBattleMode: 0x77,
		ForceEndBattleMode: 0x78,
		StartMultiClear: 0x79,
		EndMultiClear: 0x7A,
		FollowUser: 0x7B,
		UnfollowUser: 0x7C,
		GetNewNotification: 0x7D,
		ReadNewNotification: 0x7E,
		GetNotification: 0x7F,
		ReadNotification: 0x80,
		GetNgCourseNotification: 0x81,
		GetOperatingInformation: 0x82,
		GetUserOrCourse: 0x83,
		PreparePostRelationObject: 0x84,
		CompletePostRelationObject: 0x85,
		GetReqGetInfoHeadersInfo: 0x86,
		CanReportFromCourseInfo: 0x87,
		CanReportFromCommentInfo: 0x88,
		CanReportFromUserInfo: 0x89,
		CanReportFromBugDetection: 0x8A,
		ReportFromCourseInfo: 0x8B,
		ReportFromCommentInfo: 0x8C,
		ReportFromUserInfo: 0x8D,
		ReportFromBugDetection: 0x8E,
		GetAdditionalMiiClothes: 0x8F,
		GetAdditionalMiiClothesReqGetInfos: 0x90,
		DebugPreparePostObjectAdditionalMiiClothes: 0x91,
		DebugCompletePostObjectAdditionalMiiClothes: 0x92,
		SearchUsersOfficial: 0x93,
		PostPlayResultCoop: 0x94,
		PostPlayResultBattleModeFriendPersonal: 0x95,
		PostPlayResultBattleModeFriendEntire: 0x96,
		LoginCheck: 0x97,
		UpdateLastLoginInfo: 0x98,
		GetEventCourseStamp: 0x99,
		GetEventCourseStatus: 0x9A,
		ReadEventCourseResult: 0x9B,
		GetEventCourseHistogram: 0x9C,
		GetEventCourseGhost: 0x9D,
		DebugUploadEventCourseGhost: 0x9E,
		RegisterWorldMap: 0x9F,
		GetWorldMap: 0xA0,
		SearchWorldMapPlayedBy: 0xA1,
		SearchWorldMapPickUp: 0xA2,
		GetWorldMapProgress: 0xA3,
		DeleteWorldMap: 0xA4,
		InitializeWorldMapProgress: 0xA5,
		UpdateWorldMapProgress: 0xA6,
		GetUsersFriend: 0xA7,
		SearchUsersFolloweeV2: 0xA8,
		GetEventCourseFriendGhost: 0xA9
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x2F: DataStoreProtocolSuperMarioMaker2.RegisterUser,
		0x30: DataStoreProtocolSuperMarioMaker2.GetUsers,
		0x31: DataStoreProtocolSuperMarioMaker2.SyncUserProfile,
		0x32: DataStoreProtocolSuperMarioMaker2.SearchUsersUserPoint,
		0x33: DataStoreProtocolSuperMarioMaker2.SearchUsersEndlessMode,
		0x34: DataStoreProtocolSuperMarioMaker2.SearchUsersBattleMode,
		0x35: DataStoreProtocolSuperMarioMaker2.SearchUsersPlayedCourse,
		0x36: DataStoreProtocolSuperMarioMaker2.SearchUsersClearedCourse,
		0x37: DataStoreProtocolSuperMarioMaker2.SearchUsersPositiveRatedCourse,
		0x38: DataStoreProtocolSuperMarioMaker2.SearchUsersFollowee,
		0x39: DataStoreProtocolSuperMarioMaker2.SearchUsersClearRanking,
		0x3A: DataStoreProtocolSuperMarioMaker2.SearchUsersTermsRanking,
		0x3B: DataStoreProtocolSuperMarioMaker2.UpdateLastLoginTime,
		0x3C: DataStoreProtocolSuperMarioMaker2.CanPostCourse,
		0x3D: DataStoreProtocolSuperMarioMaker2.CanPostRatingAndComment,
		0x3E: DataStoreProtocolSuperMarioMaker2.UpdateMiiClothes,
		0x3F: DataStoreProtocolSuperMarioMaker2.GetMiiClothes,
		0x40: DataStoreProtocolSuperMarioMaker2.PostActivityQuest,
		0x41: DataStoreProtocolSuperMarioMaker2.GetUserNameNgType,
		0x42: DataStoreProtocolSuperMarioMaker2.PreparePostObjectCourse,
		0x43: DataStoreProtocolSuperMarioMaker2.CompletePostObjectCourse,
		0x44: DataStoreProtocolSuperMarioMaker2.CompletePostObjectsCourse,
		0x45: DataStoreProtocolSuperMarioMaker2.UpdateCourseTag,
		0x46: DataStoreProtocolSuperMarioMaker2.GetCourses,
		0x47: DataStoreProtocolSuperMarioMaker2.SearchCoursesPointRanking,
		0x48: DataStoreProtocolSuperMarioMaker2.SearchCoursesAdvanced,
		0x49: DataStoreProtocolSuperMarioMaker2.SearchCoursesLatest,
		0x4A: DataStoreProtocolSuperMarioMaker2.SearchCoursesPostedBy,
		0x4B: DataStoreProtocolSuperMarioMaker2.SearchCoursesPositiveRatedBy,
		0x4C: DataStoreProtocolSuperMarioMaker2.SearchCoursesPlayedBy,
		0x4D: DataStoreProtocolSuperMarioMaker2.SearchCoursesBattleMode,
		0x4E: DataStoreProtocolSuperMarioMaker2.SearchCoursesBattleModeByDifficulty,
		0x4F: DataStoreProtocolSuperMarioMaker2.SearchCoursesEndlessMode,
		0x50: DataStoreProtocolSuperMarioMaker2.SearchCoursesFirstClear,
		0x51: DataStoreProtocolSuperMarioMaker2.SearchCoursesBestTime,
		0x52: DataStoreProtocolSuperMarioMaker2.SearchCoursesFolloweePostedBy,
		0x53: DataStoreProtocolSuperMarioMaker2.SearchCoursesTermsRanking,
		0x54: DataStoreProtocolSuperMarioMaker2.SearchCoursesPickUp,
		0x55: DataStoreProtocolSuperMarioMaker2.GetCoursesEvent,
		0x56: DataStoreProtocolSuperMarioMaker2.SearchCoursesEvent,
		0x57: DataStoreProtocolSuperMarioMaker2.ReadEventCourseList,
		0x58: DataStoreProtocolSuperMarioMaker2.PreparePostObjectCommentPicture,
		0x59: DataStoreProtocolSuperMarioMaker2.CompletePostObjectCommentPicture,
		0x5A: DataStoreProtocolSuperMarioMaker2.CompletePostObjectsCommentPicture,
		0x5B: DataStoreProtocolSuperMarioMaker2.PostCommentText,
		0x5C: DataStoreProtocolSuperMarioMaker2.PostCommentStamp,
		0x5D: DataStoreProtocolSuperMarioMaker2.DeleteComment,
		0x5E: DataStoreProtocolSuperMarioMaker2.SearchCommentsInOrder,
		0x5F: DataStoreProtocolSuperMarioMaker2.SearchComments,
		0x60: DataStoreProtocolSuperMarioMaker2.PostPlayResult,
		0x61: DataStoreProtocolSuperMarioMaker2.PostPlayResults,
		0x62: DataStoreProtocolSuperMarioMaker2.PostPlayResultsAccumulated,
		0x63: DataStoreProtocolSuperMarioMaker2.PostPlayResultBattleModePersonal,
		0x64: DataStoreProtocolSuperMarioMaker2.PostPlayResultBattleModeEntire,
		0x65: DataStoreProtocolSuperMarioMaker2.PostPlayResultMultiClear,
		0x66: DataStoreProtocolSuperMarioMaker2.PostPlayResultEventCourse,
		0x67: DataStoreProtocolSuperMarioMaker2.GetDeathPositions,
		0x68: DataStoreProtocolSuperMarioMaker2.PostRatingInfo,
		0x69: DataStoreProtocolSuperMarioMaker2.PostRatingInfos,
		0x6A: DataStoreProtocolSuperMarioMaker2.PostRatingInfoBattleModePersonal,
		0x6B: DataStoreProtocolSuperMarioMaker2.PostRatingInfoBattleModeEntire,
		0x6C: DataStoreProtocolSuperMarioMaker2.GetEndlessModeStatus,
		0x6D: DataStoreProtocolSuperMarioMaker2.InitEndlessMode,
		0x6E: DataStoreProtocolSuperMarioMaker2.StartEndlessModeCourse,
		0x6F: DataStoreProtocolSuperMarioMaker2.DominateEndlessModeCourse,
		0x70: DataStoreProtocolSuperMarioMaker2.PassEndlessModeCourse,
		0x71: DataStoreProtocolSuperMarioMaker2.SuspendEndlessMode,
		0x72: DataStoreProtocolSuperMarioMaker2.FinishEndlessMode,
		0x73: DataStoreProtocolSuperMarioMaker2.GetEndlessModePlayInfo,
		0x74: DataStoreProtocolSuperMarioMaker2.GetEndlessModeRank,
		0x75: DataStoreProtocolSuperMarioMaker2.GetBattleModeRating,
		0x76: DataStoreProtocolSuperMarioMaker2.StartBattleMode,
		0x77: DataStoreProtocolSuperMarioMaker2.EndBattleMode,
		0x78: DataStoreProtocolSuperMarioMaker2.ForceEndBattleMode,
		0x79: DataStoreProtocolSuperMarioMaker2.StartMultiClear,
		0x7A: DataStoreProtocolSuperMarioMaker2.EndMultiClear,
		0x7B: DataStoreProtocolSuperMarioMaker2.FollowUser,
		0x7C: DataStoreProtocolSuperMarioMaker2.UnfollowUser,
		0x7D: DataStoreProtocolSuperMarioMaker2.GetNewNotification,
		0x7E: DataStoreProtocolSuperMarioMaker2.ReadNewNotification,
		0x7F: DataStoreProtocolSuperMarioMaker2.GetNotification,
		0x80: DataStoreProtocolSuperMarioMaker2.ReadNotification,
		0x81: DataStoreProtocolSuperMarioMaker2.GetNgCourseNotification,
		0x82: DataStoreProtocolSuperMarioMaker2.GetOperatingInformation,
		0x83: DataStoreProtocolSuperMarioMaker2.GetUserOrCourse,
		0x84: DataStoreProtocolSuperMarioMaker2.PreparePostRelationObject,
		0x85: DataStoreProtocolSuperMarioMaker2.CompletePostRelationObject,
		0x86: DataStoreProtocolSuperMarioMaker2.GetReqGetInfoHeadersInfo,
		0x87: DataStoreProtocolSuperMarioMaker2.CanReportFromCourseInfo,
		0x88: DataStoreProtocolSuperMarioMaker2.CanReportFromCommentInfo,
		0x89: DataStoreProtocolSuperMarioMaker2.CanReportFromUserInfo,
		0x8A: DataStoreProtocolSuperMarioMaker2.CanReportFromBugDetection,
		0x8B: DataStoreProtocolSuperMarioMaker2.ReportFromCourseInfo,
		0x8C: DataStoreProtocolSuperMarioMaker2.ReportFromCommentInfo,
		0x8D: DataStoreProtocolSuperMarioMaker2.ReportFromUserInfo,
		0x8E: DataStoreProtocolSuperMarioMaker2.ReportFromBugDetection,
		0x8F: DataStoreProtocolSuperMarioMaker2.GetAdditionalMiiClothes,
		0x90: DataStoreProtocolSuperMarioMaker2.GetAdditionalMiiClothesReqGetInfos,
		0x91: DataStoreProtocolSuperMarioMaker2.DebugPreparePostObjectAdditionalMiiClothes,
		0x92: DataStoreProtocolSuperMarioMaker2.DebugCompletePostObjectAdditionalMiiClothes,
		0x93: DataStoreProtocolSuperMarioMaker2.SearchUsersOfficial,
		0x94: DataStoreProtocolSuperMarioMaker2.PostPlayResultCoop,
		0x95: DataStoreProtocolSuperMarioMaker2.PostPlayResultBattleModeFriendPersonal,
		0x96: DataStoreProtocolSuperMarioMaker2.PostPlayResultBattleModeFriendEntire,
		0x97: DataStoreProtocolSuperMarioMaker2.LoginCheck,
		0x98: DataStoreProtocolSuperMarioMaker2.UpdateLastLoginInfo,
		0x99: DataStoreProtocolSuperMarioMaker2.GetEventCourseStamp,
		0x9A: DataStoreProtocolSuperMarioMaker2.GetEventCourseStatus,
		0x9B: DataStoreProtocolSuperMarioMaker2.ReadEventCourseResult,
		0x9C: DataStoreProtocolSuperMarioMaker2.GetEventCourseHistogram,
		0x9D: DataStoreProtocolSuperMarioMaker2.GetEventCourseGhost,
		0x9E: DataStoreProtocolSuperMarioMaker2.DebugUploadEventCourseGhost,
		0x9F: DataStoreProtocolSuperMarioMaker2.RegisterWorldMap,
		0xA0: DataStoreProtocolSuperMarioMaker2.GetWorldMap,
		0xA1: DataStoreProtocolSuperMarioMaker2.SearchWorldMapPlayedBy,
		0xA2: DataStoreProtocolSuperMarioMaker2.SearchWorldMapPickUp,
		0xA3: DataStoreProtocolSuperMarioMaker2.GetWorldMapProgress,
		0xA4: DataStoreProtocolSuperMarioMaker2.DeleteWorldMap,
		0xA5: DataStoreProtocolSuperMarioMaker2.InitializeWorldMapProgress,
		0xA6: DataStoreProtocolSuperMarioMaker2.UpdateWorldMapProgress,
		0xA7: DataStoreProtocolSuperMarioMaker2.GetUsersFriend,
		0xA8: DataStoreProtocolSuperMarioMaker2.SearchUsersFolloweeV2,
		0xA9: DataStoreProtocolSuperMarioMaker2.GetEventCourseFriendGhost
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = DataStoreProtocolSuperMarioMaker2.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			DataStoreProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static RegisterUser(message: RMCMessage): typeof Methods.RegisterUser.Request | typeof Methods.RegisterUser.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RegisterUser.Request;
		} else {
			return Methods.RegisterUser.Response;
		}
	}

	private static GetUsers(message: RMCMessage): typeof Methods.GetUsers.Request | typeof Methods.GetUsers.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetUsers.Request;
		} else {
			return Methods.GetUsers.Response;
		}
	}

	private static SyncUserProfile(message: RMCMessage): typeof Methods.SyncUserProfile.Request | typeof Methods.SyncUserProfile.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SyncUserProfile.Request;
		} else {
			return Methods.SyncUserProfile.Response;
		}
	}

	private static SearchUsersUserPoint(message: RMCMessage): typeof Methods.SearchUsersUserPoint.Request | typeof Methods.SearchUsersUserPoint.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchUsersUserPoint.Request;
		} else {
			return Methods.SearchUsersUserPoint.Response;
		}
	}

	private static SearchUsersEndlessMode(message: RMCMessage): typeof Methods.SearchUsersEndlessMode.Request | typeof Methods.SearchUsersEndlessMode.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchUsersEndlessMode.Request;
		} else {
			return Methods.SearchUsersEndlessMode.Response;
		}
	}

	private static SearchUsersBattleMode(message: RMCMessage): typeof Methods.SearchUsersBattleMode.Request | typeof Methods.SearchUsersBattleMode.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchUsersBattleMode.Request;
		} else {
			return Methods.SearchUsersBattleMode.Response;
		}
	}

	private static SearchUsersPlayedCourse(message: RMCMessage): typeof Methods.SearchUsersPlayedCourse.Request | typeof Methods.SearchUsersPlayedCourse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchUsersPlayedCourse.Request;
		} else {
			return Methods.SearchUsersPlayedCourse.Response;
		}
	}

	private static SearchUsersClearedCourse(message: RMCMessage): typeof Methods.SearchUsersClearedCourse.Request | typeof Methods.SearchUsersClearedCourse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchUsersClearedCourse.Request;
		} else {
			return Methods.SearchUsersClearedCourse.Response;
		}
	}

	private static SearchUsersPositiveRatedCourse(message: RMCMessage): typeof Methods.SearchUsersPositiveRatedCourse.Request | typeof Methods.SearchUsersPositiveRatedCourse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchUsersPositiveRatedCourse.Request;
		} else {
			return Methods.SearchUsersPositiveRatedCourse.Response;
		}
	}

	private static SearchUsersFollowee(message: RMCMessage): typeof Methods.SearchUsersFollowee.Request | typeof Methods.SearchUsersFollowee.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchUsersFollowee.Request;
		} else {
			return Methods.SearchUsersFollowee.Response;
		}
	}

	private static SearchUsersClearRanking(message: RMCMessage): typeof Methods.SearchUsersClearRanking.Request | typeof Methods.SearchUsersClearRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchUsersClearRanking.Request;
		} else {
			return Methods.SearchUsersClearRanking.Response;
		}
	}

	private static SearchUsersTermsRanking(message: RMCMessage): typeof Methods.SearchUsersTermsRanking.Request | typeof Methods.SearchUsersTermsRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchUsersTermsRanking.Request;
		} else {
			return Methods.SearchUsersTermsRanking.Response;
		}
	}

	private static UpdateLastLoginTime(message: RMCMessage): typeof Methods.UpdateLastLoginTime.Request | typeof Methods.UpdateLastLoginTime.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateLastLoginTime.Request;
		} else {
			return Methods.UpdateLastLoginTime.Response;
		}
	}

	private static CanPostCourse(message: RMCMessage): typeof Methods.CanPostCourse.Request | typeof Methods.CanPostCourse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CanPostCourse.Request;
		} else {
			return Methods.CanPostCourse.Response;
		}
	}

	private static CanPostRatingAndComment(message: RMCMessage): typeof Methods.CanPostRatingAndComment.Request | typeof Methods.CanPostRatingAndComment.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CanPostRatingAndComment.Request;
		} else {
			return Methods.CanPostRatingAndComment.Response;
		}
	}

	private static UpdateMiiClothes(message: RMCMessage): typeof Methods.UpdateMiiClothes.Request | typeof Methods.UpdateMiiClothes.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateMiiClothes.Request;
		} else {
			return Methods.UpdateMiiClothes.Response;
		}
	}

	private static GetMiiClothes(message: RMCMessage): typeof Methods.GetMiiClothes.Request | typeof Methods.GetMiiClothes.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetMiiClothes.Request;
		} else {
			return Methods.GetMiiClothes.Response;
		}
	}

	private static PostActivityQuest(message: RMCMessage): typeof Methods.PostActivityQuest.Request | typeof Methods.PostActivityQuest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostActivityQuest.Request;
		} else {
			return Methods.PostActivityQuest.Response;
		}
	}

	private static GetUserNameNgType(message: RMCMessage): typeof Methods.GetUserNameNgType.Request | typeof Methods.GetUserNameNgType.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetUserNameNgType.Request;
		} else {
			return Methods.GetUserNameNgType.Response;
		}
	}

	private static PreparePostObjectCourse(message: RMCMessage): typeof Methods.PreparePostObjectCourse.Request | typeof Methods.PreparePostObjectCourse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PreparePostObjectCourse.Request;
		} else {
			return Methods.PreparePostObjectCourse.Response;
		}
	}

	private static CompletePostObjectCourse(message: RMCMessage): typeof Methods.CompletePostObjectCourse.Request | typeof Methods.CompletePostObjectCourse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompletePostObjectCourse.Request;
		} else {
			return Methods.CompletePostObjectCourse.Response;
		}
	}

	private static CompletePostObjectsCourse(message: RMCMessage): typeof Methods.CompletePostObjectsCourse.Request | typeof Methods.CompletePostObjectsCourse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompletePostObjectsCourse.Request;
		} else {
			return Methods.CompletePostObjectsCourse.Response;
		}
	}

	private static UpdateCourseTag(message: RMCMessage): typeof Methods.UpdateCourseTag.Request | typeof Methods.UpdateCourseTag.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateCourseTag.Request;
		} else {
			return Methods.UpdateCourseTag.Response;
		}
	}

	private static GetCourses(message: RMCMessage): typeof Methods.GetCourses.Request | typeof Methods.GetCourses.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCourses.Request;
		} else {
			return Methods.GetCourses.Response;
		}
	}

	private static SearchCoursesPointRanking(message: RMCMessage): typeof Methods.SearchCoursesPointRanking.Request | typeof Methods.SearchCoursesPointRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCoursesPointRanking.Request;
		} else {
			return Methods.SearchCoursesPointRanking.Response;
		}
	}

	private static SearchCoursesAdvanced(message: RMCMessage): typeof Methods.SearchCoursesAdvanced.Request | typeof Methods.SearchCoursesAdvanced.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCoursesAdvanced.Request;
		} else {
			return Methods.SearchCoursesAdvanced.Response;
		}
	}

	private static SearchCoursesLatest(message: RMCMessage): typeof Methods.SearchCoursesLatest.Request | typeof Methods.SearchCoursesLatest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCoursesLatest.Request;
		} else {
			return Methods.SearchCoursesLatest.Response;
		}
	}

	private static SearchCoursesPostedBy(message: RMCMessage): typeof Methods.SearchCoursesPostedBy.Request | typeof Methods.SearchCoursesPostedBy.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCoursesPostedBy.Request;
		} else {
			return Methods.SearchCoursesPostedBy.Response;
		}
	}

	private static SearchCoursesPositiveRatedBy(message: RMCMessage): typeof Methods.SearchCoursesPositiveRatedBy.Request | typeof Methods.SearchCoursesPositiveRatedBy.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCoursesPositiveRatedBy.Request;
		} else {
			return Methods.SearchCoursesPositiveRatedBy.Response;
		}
	}

	private static SearchCoursesPlayedBy(message: RMCMessage): typeof Methods.SearchCoursesPlayedBy.Request | typeof Methods.SearchCoursesPlayedBy.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCoursesPlayedBy.Request;
		} else {
			return Methods.SearchCoursesPlayedBy.Response;
		}
	}

	private static SearchCoursesBattleMode(message: RMCMessage): typeof Methods.SearchCoursesBattleMode.Request | typeof Methods.SearchCoursesBattleMode.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCoursesBattleMode.Request;
		} else {
			return Methods.SearchCoursesBattleMode.Response;
		}
	}

	private static SearchCoursesBattleModeByDifficulty(message: RMCMessage): typeof Methods.SearchCoursesBattleModeByDifficulty.Request | typeof Methods.SearchCoursesBattleModeByDifficulty.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCoursesBattleModeByDifficulty.Request;
		} else {
			return Methods.SearchCoursesBattleModeByDifficulty.Response;
		}
	}

	private static SearchCoursesEndlessMode(message: RMCMessage): typeof Methods.SearchCoursesEndlessMode.Request | typeof Methods.SearchCoursesEndlessMode.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCoursesEndlessMode.Request;
		} else {
			return Methods.SearchCoursesEndlessMode.Response;
		}
	}

	private static SearchCoursesFirstClear(message: RMCMessage): typeof Methods.SearchCoursesFirstClear.Request | typeof Methods.SearchCoursesFirstClear.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCoursesFirstClear.Request;
		} else {
			return Methods.SearchCoursesFirstClear.Response;
		}
	}

	private static SearchCoursesBestTime(message: RMCMessage): typeof Methods.SearchCoursesBestTime.Request | typeof Methods.SearchCoursesBestTime.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCoursesBestTime.Request;
		} else {
			return Methods.SearchCoursesBestTime.Response;
		}
	}

	private static SearchCoursesFolloweePostedBy(message: RMCMessage): typeof Methods.SearchCoursesFolloweePostedBy.Request | typeof Methods.SearchCoursesFolloweePostedBy.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCoursesFolloweePostedBy.Request;
		} else {
			return Methods.SearchCoursesFolloweePostedBy.Response;
		}
	}

	private static SearchCoursesTermsRanking(message: RMCMessage): typeof Methods.SearchCoursesTermsRanking.Request | typeof Methods.SearchCoursesTermsRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCoursesTermsRanking.Request;
		} else {
			return Methods.SearchCoursesTermsRanking.Response;
		}
	}

	private static SearchCoursesPickUp(message: RMCMessage): typeof Methods.SearchCoursesPickUp.Request | typeof Methods.SearchCoursesPickUp.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCoursesPickUp.Request;
		} else {
			return Methods.SearchCoursesPickUp.Response;
		}
	}

	private static GetCoursesEvent(message: RMCMessage): typeof Methods.GetCoursesEvent.Request | typeof Methods.GetCoursesEvent.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCoursesEvent.Request;
		} else {
			return Methods.GetCoursesEvent.Response;
		}
	}

	private static SearchCoursesEvent(message: RMCMessage): typeof Methods.SearchCoursesEvent.Request | typeof Methods.SearchCoursesEvent.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCoursesEvent.Request;
		} else {
			return Methods.SearchCoursesEvent.Response;
		}
	}

	private static ReadEventCourseList(message: RMCMessage): typeof Methods.ReadEventCourseList.Request | typeof Methods.ReadEventCourseList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReadEventCourseList.Request;
		} else {
			return Methods.ReadEventCourseList.Response;
		}
	}

	private static PreparePostObjectCommentPicture(message: RMCMessage): typeof Methods.PreparePostObjectCommentPicture.Request | typeof Methods.PreparePostObjectCommentPicture.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PreparePostObjectCommentPicture.Request;
		} else {
			return Methods.PreparePostObjectCommentPicture.Response;
		}
	}

	private static CompletePostObjectCommentPicture(message: RMCMessage): typeof Methods.CompletePostObjectCommentPicture.Request | typeof Methods.CompletePostObjectCommentPicture.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompletePostObjectCommentPicture.Request;
		} else {
			return Methods.CompletePostObjectCommentPicture.Response;
		}
	}

	private static CompletePostObjectsCommentPicture(message: RMCMessage): typeof Methods.CompletePostObjectsCommentPicture.Request | typeof Methods.CompletePostObjectsCommentPicture.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompletePostObjectsCommentPicture.Request;
		} else {
			return Methods.CompletePostObjectsCommentPicture.Response;
		}
	}

	private static PostCommentText(message: RMCMessage): typeof Methods.PostCommentText.Request | typeof Methods.PostCommentText.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostCommentText.Request;
		} else {
			return Methods.PostCommentText.Response;
		}
	}

	private static PostCommentStamp(message: RMCMessage): typeof Methods.PostCommentStamp.Request | typeof Methods.PostCommentStamp.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostCommentStamp.Request;
		} else {
			return Methods.PostCommentStamp.Response;
		}
	}

	private static DeleteComment(message: RMCMessage): typeof Methods.DeleteComment.Request | typeof Methods.DeleteComment.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteComment.Request;
		} else {
			return Methods.DeleteComment.Response;
		}
	}

	private static SearchCommentsInOrder(message: RMCMessage): typeof Methods.SearchCommentsInOrder.Request | typeof Methods.SearchCommentsInOrder.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchCommentsInOrder.Request;
		} else {
			return Methods.SearchCommentsInOrder.Response;
		}
	}

	private static SearchComments(message: RMCMessage): typeof Methods.SearchComments.Request | typeof Methods.SearchComments.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchComments.Request;
		} else {
			return Methods.SearchComments.Response;
		}
	}

	private static PostPlayResult(message: RMCMessage): typeof Methods.PostPlayResult.Request | typeof Methods.PostPlayResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostPlayResult.Request;
		} else {
			return Methods.PostPlayResult.Response;
		}
	}

	private static PostPlayResults(message: RMCMessage): typeof Methods.PostPlayResults.Request | typeof Methods.PostPlayResults.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostPlayResults.Request;
		} else {
			return Methods.PostPlayResults.Response;
		}
	}

	private static PostPlayResultsAccumulated(message: RMCMessage): typeof Methods.PostPlayResultsAccumulated.Request | typeof Methods.PostPlayResultsAccumulated.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostPlayResultsAccumulated.Request;
		} else {
			return Methods.PostPlayResultsAccumulated.Response;
		}
	}

	private static PostPlayResultBattleModePersonal(message: RMCMessage): typeof Methods.PostPlayResultBattleModePersonal.Request | typeof Methods.PostPlayResultBattleModePersonal.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostPlayResultBattleModePersonal.Request;
		} else {
			return Methods.PostPlayResultBattleModePersonal.Response;
		}
	}

	private static PostPlayResultBattleModeEntire(message: RMCMessage): typeof Methods.PostPlayResultBattleModeEntire.Request | typeof Methods.PostPlayResultBattleModeEntire.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostPlayResultBattleModeEntire.Request;
		} else {
			return Methods.PostPlayResultBattleModeEntire.Response;
		}
	}

	private static PostPlayResultMultiClear(message: RMCMessage): typeof Methods.PostPlayResultMultiClear.Request | typeof Methods.PostPlayResultMultiClear.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostPlayResultMultiClear.Request;
		} else {
			return Methods.PostPlayResultMultiClear.Response;
		}
	}

	private static PostPlayResultEventCourse(message: RMCMessage): typeof Methods.PostPlayResultEventCourse.Request | typeof Methods.PostPlayResultEventCourse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostPlayResultEventCourse.Request;
		} else {
			return Methods.PostPlayResultEventCourse.Response;
		}
	}

	private static GetDeathPositions(message: RMCMessage): typeof Methods.GetDeathPositions.Request | typeof Methods.GetDeathPositions.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetDeathPositions.Request;
		} else {
			return Methods.GetDeathPositions.Response;
		}
	}

	private static PostRatingInfo(message: RMCMessage): typeof Methods.PostRatingInfo.Request | typeof Methods.PostRatingInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostRatingInfo.Request;
		} else {
			return Methods.PostRatingInfo.Response;
		}
	}

	private static PostRatingInfos(message: RMCMessage): typeof Methods.PostRatingInfos.Request | typeof Methods.PostRatingInfos.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostRatingInfos.Request;
		} else {
			return Methods.PostRatingInfos.Response;
		}
	}

	private static PostRatingInfoBattleModePersonal(message: RMCMessage): typeof Methods.PostRatingInfoBattleModePersonal.Request | typeof Methods.PostRatingInfoBattleModePersonal.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostRatingInfoBattleModePersonal.Request;
		} else {
			return Methods.PostRatingInfoBattleModePersonal.Response;
		}
	}

	private static PostRatingInfoBattleModeEntire(message: RMCMessage): typeof Methods.PostRatingInfoBattleModeEntire.Request | typeof Methods.PostRatingInfoBattleModeEntire.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostRatingInfoBattleModeEntire.Request;
		} else {
			return Methods.PostRatingInfoBattleModeEntire.Response;
		}
	}

	private static GetEndlessModeStatus(message: RMCMessage): typeof Methods.GetEndlessModeStatus.Request | typeof Methods.GetEndlessModeStatus.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetEndlessModeStatus.Request;
		} else {
			return Methods.GetEndlessModeStatus.Response;
		}
	}

	private static InitEndlessMode(message: RMCMessage): typeof Methods.InitEndlessMode.Request | typeof Methods.InitEndlessMode.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.InitEndlessMode.Request;
		} else {
			return Methods.InitEndlessMode.Response;
		}
	}

	private static StartEndlessModeCourse(message: RMCMessage): typeof Methods.StartEndlessModeCourse.Request | typeof Methods.StartEndlessModeCourse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.StartEndlessModeCourse.Request;
		} else {
			return Methods.StartEndlessModeCourse.Response;
		}
	}

	private static DominateEndlessModeCourse(message: RMCMessage): typeof Methods.DominateEndlessModeCourse.Request | typeof Methods.DominateEndlessModeCourse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DominateEndlessModeCourse.Request;
		} else {
			return Methods.DominateEndlessModeCourse.Response;
		}
	}

	private static PassEndlessModeCourse(message: RMCMessage): typeof Methods.PassEndlessModeCourse.Request | typeof Methods.PassEndlessModeCourse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PassEndlessModeCourse.Request;
		} else {
			return Methods.PassEndlessModeCourse.Response;
		}
	}

	private static SuspendEndlessMode(message: RMCMessage): typeof Methods.SuspendEndlessMode.Request | typeof Methods.SuspendEndlessMode.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SuspendEndlessMode.Request;
		} else {
			return Methods.SuspendEndlessMode.Response;
		}
	}

	private static FinishEndlessMode(message: RMCMessage): typeof Methods.FinishEndlessMode.Request | typeof Methods.FinishEndlessMode.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FinishEndlessMode.Request;
		} else {
			return Methods.FinishEndlessMode.Response;
		}
	}

	private static GetEndlessModePlayInfo(message: RMCMessage): typeof Methods.GetEndlessModePlayInfo.Request | typeof Methods.GetEndlessModePlayInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetEndlessModePlayInfo.Request;
		} else {
			return Methods.GetEndlessModePlayInfo.Response;
		}
	}

	private static GetEndlessModeRank(message: RMCMessage): typeof Methods.GetEndlessModeRank.Request | typeof Methods.GetEndlessModeRank.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetEndlessModeRank.Request;
		} else {
			return Methods.GetEndlessModeRank.Response;
		}
	}

	private static GetBattleModeRating(message: RMCMessage): typeof Methods.GetBattleModeRating.Request | typeof Methods.GetBattleModeRating.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetBattleModeRating.Request;
		} else {
			return Methods.GetBattleModeRating.Response;
		}
	}

	private static StartBattleMode(message: RMCMessage): typeof Methods.StartBattleMode.Request | typeof Methods.StartBattleMode.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.StartBattleMode.Request;
		} else {
			return Methods.StartBattleMode.Response;
		}
	}

	private static EndBattleMode(message: RMCMessage): typeof Methods.EndBattleMode.Request | typeof Methods.EndBattleMode.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.EndBattleMode.Request;
		} else {
			return Methods.EndBattleMode.Response;
		}
	}

	private static ForceEndBattleMode(message: RMCMessage): typeof Methods.ForceEndBattleMode.Request | typeof Methods.ForceEndBattleMode.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ForceEndBattleMode.Request;
		} else {
			return Methods.ForceEndBattleMode.Response;
		}
	}

	private static StartMultiClear(message: RMCMessage): typeof Methods.StartMultiClear.Request | typeof Methods.StartMultiClear.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.StartMultiClear.Request;
		} else {
			return Methods.StartMultiClear.Response;
		}
	}

	private static EndMultiClear(message: RMCMessage): typeof Methods.EndMultiClear.Request | typeof Methods.EndMultiClear.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.EndMultiClear.Request;
		} else {
			return Methods.EndMultiClear.Response;
		}
	}

	private static FollowUser(message: RMCMessage): typeof Methods.FollowUser.Request | typeof Methods.FollowUser.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FollowUser.Request;
		} else {
			return Methods.FollowUser.Response;
		}
	}

	private static UnfollowUser(message: RMCMessage): typeof Methods.UnfollowUser.Request | typeof Methods.UnfollowUser.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnfollowUser.Request;
		} else {
			return Methods.UnfollowUser.Response;
		}
	}

	private static GetNewNotification(message: RMCMessage): typeof Methods.GetNewNotification.Request | typeof Methods.GetNewNotification.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetNewNotification.Request;
		} else {
			return Methods.GetNewNotification.Response;
		}
	}

	private static ReadNewNotification(message: RMCMessage): typeof Methods.ReadNewNotification.Request | typeof Methods.ReadNewNotification.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReadNewNotification.Request;
		} else {
			return Methods.ReadNewNotification.Response;
		}
	}

	private static GetNotification(message: RMCMessage): typeof Methods.GetNotification.Request | typeof Methods.GetNotification.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetNotification.Request;
		} else {
			return Methods.GetNotification.Response;
		}
	}

	private static ReadNotification(message: RMCMessage): typeof Methods.ReadNotification.Request | typeof Methods.ReadNotification.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReadNotification.Request;
		} else {
			return Methods.ReadNotification.Response;
		}
	}

	private static GetNgCourseNotification(message: RMCMessage): typeof Methods.GetNgCourseNotification.Request | typeof Methods.GetNgCourseNotification.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetNgCourseNotification.Request;
		} else {
			return Methods.GetNgCourseNotification.Response;
		}
	}

	private static GetOperatingInformation(message: RMCMessage): typeof Methods.GetOperatingInformation.Request | typeof Methods.GetOperatingInformation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetOperatingInformation.Request;
		} else {
			return Methods.GetOperatingInformation.Response;
		}
	}

	private static GetUserOrCourse(message: RMCMessage): typeof Methods.GetUserOrCourse.Request | typeof Methods.GetUserOrCourse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetUserOrCourse.Request;
		} else {
			return Methods.GetUserOrCourse.Response;
		}
	}

	private static PreparePostRelationObject(message: RMCMessage): typeof Methods.PreparePostRelationObject.Request | typeof Methods.PreparePostRelationObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PreparePostRelationObject.Request;
		} else {
			return Methods.PreparePostRelationObject.Response;
		}
	}

	private static CompletePostRelationObject(message: RMCMessage): typeof Methods.CompletePostRelationObject.Request | typeof Methods.CompletePostRelationObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompletePostRelationObject.Request;
		} else {
			return Methods.CompletePostRelationObject.Response;
		}
	}

	private static GetReqGetInfoHeadersInfo(message: RMCMessage): typeof Methods.GetReqGetInfoHeadersInfo.Request | typeof Methods.GetReqGetInfoHeadersInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetReqGetInfoHeadersInfo.Request;
		} else {
			return Methods.GetReqGetInfoHeadersInfo.Response;
		}
	}

	private static CanReportFromCourseInfo(message: RMCMessage): typeof Methods.CanReportFromCourseInfo.Request | typeof Methods.CanReportFromCourseInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CanReportFromCourseInfo.Request;
		} else {
			return Methods.CanReportFromCourseInfo.Response;
		}
	}

	private static CanReportFromCommentInfo(message: RMCMessage): typeof Methods.CanReportFromCommentInfo.Request | typeof Methods.CanReportFromCommentInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CanReportFromCommentInfo.Request;
		} else {
			return Methods.CanReportFromCommentInfo.Response;
		}
	}

	private static CanReportFromUserInfo(message: RMCMessage): typeof Methods.CanReportFromUserInfo.Request | typeof Methods.CanReportFromUserInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CanReportFromUserInfo.Request;
		} else {
			return Methods.CanReportFromUserInfo.Response;
		}
	}

	private static CanReportFromBugDetection(message: RMCMessage): typeof Methods.CanReportFromBugDetection.Request | typeof Methods.CanReportFromBugDetection.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CanReportFromBugDetection.Request;
		} else {
			return Methods.CanReportFromBugDetection.Response;
		}
	}

	private static ReportFromCourseInfo(message: RMCMessage): typeof Methods.ReportFromCourseInfo.Request | typeof Methods.ReportFromCourseInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReportFromCourseInfo.Request;
		} else {
			return Methods.ReportFromCourseInfo.Response;
		}
	}

	private static ReportFromCommentInfo(message: RMCMessage): typeof Methods.ReportFromCommentInfo.Request | typeof Methods.ReportFromCommentInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReportFromCommentInfo.Request;
		} else {
			return Methods.ReportFromCommentInfo.Response;
		}
	}

	private static ReportFromUserInfo(message: RMCMessage): typeof Methods.ReportFromUserInfo.Request | typeof Methods.ReportFromUserInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReportFromUserInfo.Request;
		} else {
			return Methods.ReportFromUserInfo.Response;
		}
	}

	private static ReportFromBugDetection(message: RMCMessage): typeof Methods.ReportFromBugDetection.Request | typeof Methods.ReportFromBugDetection.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReportFromBugDetection.Request;
		} else {
			return Methods.ReportFromBugDetection.Response;
		}
	}

	private static GetAdditionalMiiClothes(message: RMCMessage): typeof Methods.GetAdditionalMiiClothes.Request | typeof Methods.GetAdditionalMiiClothes.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetAdditionalMiiClothes.Request;
		} else {
			return Methods.GetAdditionalMiiClothes.Response;
		}
	}

	private static GetAdditionalMiiClothesReqGetInfos(message: RMCMessage): typeof Methods.GetAdditionalMiiClothesReqGetInfos.Request | typeof Methods.GetAdditionalMiiClothesReqGetInfos.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetAdditionalMiiClothesReqGetInfos.Request;
		} else {
			return Methods.GetAdditionalMiiClothesReqGetInfos.Response;
		}
	}

	private static DebugPreparePostObjectAdditionalMiiClothes(message: RMCMessage): typeof Methods.DebugPreparePostObjectAdditionalMiiClothes.Request | typeof Methods.DebugPreparePostObjectAdditionalMiiClothes.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DebugPreparePostObjectAdditionalMiiClothes.Request;
		} else {
			return Methods.DebugPreparePostObjectAdditionalMiiClothes.Response;
		}
	}

	private static DebugCompletePostObjectAdditionalMiiClothes(message: RMCMessage): typeof Methods.DebugCompletePostObjectAdditionalMiiClothes.Request | typeof Methods.DebugCompletePostObjectAdditionalMiiClothes.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DebugCompletePostObjectAdditionalMiiClothes.Request;
		} else {
			return Methods.DebugCompletePostObjectAdditionalMiiClothes.Response;
		}
	}

	private static SearchUsersOfficial(message: RMCMessage): typeof Methods.SearchUsersOfficial.Request | typeof Methods.SearchUsersOfficial.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchUsersOfficial.Request;
		} else {
			return Methods.SearchUsersOfficial.Response;
		}
	}

	private static PostPlayResultCoop(message: RMCMessage): typeof Methods.PostPlayResultCoop.Request | typeof Methods.PostPlayResultCoop.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostPlayResultCoop.Request;
		} else {
			return Methods.PostPlayResultCoop.Response;
		}
	}

	private static PostPlayResultBattleModeFriendPersonal(message: RMCMessage): typeof Methods.PostPlayResultBattleModeFriendPersonal.Request | typeof Methods.PostPlayResultBattleModeFriendPersonal.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostPlayResultBattleModeFriendPersonal.Request;
		} else {
			return Methods.PostPlayResultBattleModeFriendPersonal.Response;
		}
	}

	private static PostPlayResultBattleModeFriendEntire(message: RMCMessage): typeof Methods.PostPlayResultBattleModeFriendEntire.Request | typeof Methods.PostPlayResultBattleModeFriendEntire.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostPlayResultBattleModeFriendEntire.Request;
		} else {
			return Methods.PostPlayResultBattleModeFriendEntire.Response;
		}
	}

	private static LoginCheck(message: RMCMessage): typeof Methods.LoginCheck.Request | typeof Methods.LoginCheck.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.LoginCheck.Request;
		} else {
			return Methods.LoginCheck.Response;
		}
	}

	private static UpdateLastLoginInfo(message: RMCMessage): typeof Methods.UpdateLastLoginInfo.Request | typeof Methods.UpdateLastLoginInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateLastLoginInfo.Request;
		} else {
			return Methods.UpdateLastLoginInfo.Response;
		}
	}

	private static GetEventCourseStamp(message: RMCMessage): typeof Methods.GetEventCourseStamp.Request | typeof Methods.GetEventCourseStamp.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetEventCourseStamp.Request;
		} else {
			return Methods.GetEventCourseStamp.Response;
		}
	}

	private static GetEventCourseStatus(message: RMCMessage): typeof Methods.GetEventCourseStatus.Request | typeof Methods.GetEventCourseStatus.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetEventCourseStatus.Request;
		} else {
			return Methods.GetEventCourseStatus.Response;
		}
	}

	private static ReadEventCourseResult(message: RMCMessage): typeof Methods.ReadEventCourseResult.Request | typeof Methods.ReadEventCourseResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReadEventCourseResult.Request;
		} else {
			return Methods.ReadEventCourseResult.Response;
		}
	}

	private static GetEventCourseHistogram(message: RMCMessage): typeof Methods.GetEventCourseHistogram.Request | typeof Methods.GetEventCourseHistogram.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetEventCourseHistogram.Request;
		} else {
			return Methods.GetEventCourseHistogram.Response;
		}
	}

	private static GetEventCourseGhost(message: RMCMessage): typeof Methods.GetEventCourseGhost.Request | typeof Methods.GetEventCourseGhost.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetEventCourseGhost.Request;
		} else {
			return Methods.GetEventCourseGhost.Response;
		}
	}

	private static DebugUploadEventCourseGhost(message: RMCMessage): typeof Methods.DebugUploadEventCourseGhost.Request | typeof Methods.DebugUploadEventCourseGhost.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DebugUploadEventCourseGhost.Request;
		} else {
			return Methods.DebugUploadEventCourseGhost.Response;
		}
	}

	private static RegisterWorldMap(message: RMCMessage): typeof Methods.RegisterWorldMap.Request | typeof Methods.RegisterWorldMap.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RegisterWorldMap.Request;
		} else {
			return Methods.RegisterWorldMap.Response;
		}
	}

	private static GetWorldMap(message: RMCMessage): typeof Methods.GetWorldMap.Request | typeof Methods.GetWorldMap.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetWorldMap.Request;
		} else {
			return Methods.GetWorldMap.Response;
		}
	}

	private static SearchWorldMapPlayedBy(message: RMCMessage): typeof Methods.SearchWorldMapPlayedBy.Request | typeof Methods.SearchWorldMapPlayedBy.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchWorldMapPlayedBy.Request;
		} else {
			return Methods.SearchWorldMapPlayedBy.Response;
		}
	}

	private static SearchWorldMapPickUp(message: RMCMessage): typeof Methods.SearchWorldMapPickUp.Request | typeof Methods.SearchWorldMapPickUp.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchWorldMapPickUp.Request;
		} else {
			return Methods.SearchWorldMapPickUp.Response;
		}
	}

	private static GetWorldMapProgress(message: RMCMessage): typeof Methods.GetWorldMapProgress.Request | typeof Methods.GetWorldMapProgress.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetWorldMapProgress.Request;
		} else {
			return Methods.GetWorldMapProgress.Response;
		}
	}

	private static DeleteWorldMap(message: RMCMessage): typeof Methods.DeleteWorldMap.Request | typeof Methods.DeleteWorldMap.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteWorldMap.Request;
		} else {
			return Methods.DeleteWorldMap.Response;
		}
	}

	private static InitializeWorldMapProgress(message: RMCMessage): typeof Methods.InitializeWorldMapProgress.Request | typeof Methods.InitializeWorldMapProgress.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.InitializeWorldMapProgress.Request;
		} else {
			return Methods.InitializeWorldMapProgress.Response;
		}
	}

	private static UpdateWorldMapProgress(message: RMCMessage): typeof Methods.UpdateWorldMapProgress.Request | typeof Methods.UpdateWorldMapProgress.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateWorldMapProgress.Request;
		} else {
			return Methods.UpdateWorldMapProgress.Response;
		}
	}

	private static GetUsersFriend(message: RMCMessage): typeof Methods.GetUsersFriend.Request | typeof Methods.GetUsersFriend.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetUsersFriend.Request;
		} else {
			return Methods.GetUsersFriend.Response;
		}
	}

	private static SearchUsersFolloweeV2(message: RMCMessage): typeof Methods.SearchUsersFolloweeV2.Request | typeof Methods.SearchUsersFolloweeV2.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchUsersFolloweeV2.Request;
		} else {
			return Methods.SearchUsersFolloweeV2.Response;
		}
	}

	private static GetEventCourseFriendGhost(message: RMCMessage): typeof Methods.GetEventCourseFriendGhost.Request | typeof Methods.GetEventCourseFriendGhost.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetEventCourseFriendGhost.Request;
		} else {
			return Methods.GetEventCourseFriendGhost.Response;
		}
	}
}
