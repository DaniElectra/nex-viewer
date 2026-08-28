import RMCMessage from '@/nex/rmc-message';
import DataStoreProtocol from '@/nex/protocols/datastore';
import * as Methods from '@/nex/protocols/datastore/super-mario-maker/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class DataStoreProtocolSuperMarioMaker {
	static ID = 0x73;
	static Name = 'DataStore (Super Mario Maker)';

	static Methods = {
		GetObjectInfos: 0x2D,
		GetMetaByOwnerId: 0x2E,
		CustomSearchObject: 0x2F,
		RateCustomRanking: 0x30,
		GetCustomRanking: 0x31,
		GetCustomRankingByDataId: 0x32,
		DeleteCustomRanking: 0x33,
		AddToBufferQueue: 0x34,
		AddToBufferQueues: 0x35,
		GetBufferQueue: 0x36,
		GetBufferQueues: 0x37,
		ClearBufferQueues: 0x38,
		CompleteAttachFile: 0x39,
		CompleteAttachFileV1: 0x3A,
		PrepareAttachFile: 0x3B,
		ConditionalSearchObject: 0x3C,
		GetApplicationConfig: 0x3D,
		SetApplicationConfig: 0x3E,
		DeleteApplicationConfig: 0x3F,
		LatestCourseSearchObject: 0x40,
		FollowingsLatestCourseSearchObject: 0x41,
		RecommendedCourseSearchObject: 0x42,
		ScoreRangeCascadedSearchObject: 0x43,
		SuggestedCourseSearchObject: 0x44,
		PreparePostObjectWithOwnerIdAndDataId: 0x45,
		CompletePostObjectWithOwnerId: 0x46,
		UploadCourseRecord: 0x47,
		GetCourseRecord: 0x48,
		DeleteCourseRecord: 0x49,
		GetApplicationConfigString: 0x4A,
		SetApplicationConfigString: 0x4B,
		GetDeletionReason: 0x4C,
		SetDeletionReason: 0x4D,
		GetMetasWithCourseRecord: 0x4E,
		CheckRateCustomRankingCounter: 0x4F,
		ResetRateCustomRankingCounter: 0x50,
		BestScoreRateCourseSearchObject: 0x51,
		CTRPickUpCourseSearchObject: 0x52,
		SetCachedRanking: 0x53,
		DeleteCachedRanking: 0x54,
		ChangePlayablePlatform: 0x55,
		SearchUnknownPlatformObjects: 0x56,
		ReportCourse: 0x57
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x2D: DataStoreProtocolSuperMarioMaker.GetObjectInfos,
		0x2E: DataStoreProtocolSuperMarioMaker.GetMetaByOwnerId,
		0x2F: DataStoreProtocolSuperMarioMaker.CustomSearchObject,
		0x30: DataStoreProtocolSuperMarioMaker.RateCustomRanking,
		0x31: DataStoreProtocolSuperMarioMaker.GetCustomRanking,
		0x32: DataStoreProtocolSuperMarioMaker.GetCustomRankingByDataId,
		0x33: DataStoreProtocolSuperMarioMaker.DeleteCustomRanking,
		0x34: DataStoreProtocolSuperMarioMaker.AddToBufferQueue,
		0x35: DataStoreProtocolSuperMarioMaker.AddToBufferQueues,
		0x36: DataStoreProtocolSuperMarioMaker.GetBufferQueue,
		0x37: DataStoreProtocolSuperMarioMaker.GetBufferQueues,
		0x38: DataStoreProtocolSuperMarioMaker.ClearBufferQueues,
		0x39: DataStoreProtocolSuperMarioMaker.CompleteAttachFile,
		0x3A: DataStoreProtocolSuperMarioMaker.CompleteAttachFileV1,
		0x3B: DataStoreProtocolSuperMarioMaker.PrepareAttachFile,
		0x3C: DataStoreProtocolSuperMarioMaker.ConditionalSearchObject,
		0x3D: DataStoreProtocolSuperMarioMaker.GetApplicationConfig,
		0x3E: DataStoreProtocolSuperMarioMaker.SetApplicationConfig,
		0x3F: DataStoreProtocolSuperMarioMaker.DeleteApplicationConfig,
		0x40: DataStoreProtocolSuperMarioMaker.LatestCourseSearchObject,
		0x41: DataStoreProtocolSuperMarioMaker.FollowingsLatestCourseSearchObject,
		0x42: DataStoreProtocolSuperMarioMaker.RecommendedCourseSearchObject,
		0x43: DataStoreProtocolSuperMarioMaker.ScoreRangeCascadedSearchObject,
		0x44: DataStoreProtocolSuperMarioMaker.SuggestedCourseSearchObject,
		0x45: DataStoreProtocolSuperMarioMaker.PreparePostObjectWithOwnerIdAndDataId,
		0x46: DataStoreProtocolSuperMarioMaker.CompletePostObjectWithOwnerId,
		0x47: DataStoreProtocolSuperMarioMaker.UploadCourseRecord,
		0x48: DataStoreProtocolSuperMarioMaker.GetCourseRecord,
		0x49: DataStoreProtocolSuperMarioMaker.DeleteCourseRecord,
		0x4A: DataStoreProtocolSuperMarioMaker.GetApplicationConfigString,
		0x4B: DataStoreProtocolSuperMarioMaker.SetApplicationConfigString,
		0x4C: DataStoreProtocolSuperMarioMaker.GetDeletionReason,
		0x4D: DataStoreProtocolSuperMarioMaker.SetDeletionReason,
		0x4E: DataStoreProtocolSuperMarioMaker.GetMetasWithCourseRecord,
		0x4F: DataStoreProtocolSuperMarioMaker.CheckRateCustomRankingCounter,
		0x50: DataStoreProtocolSuperMarioMaker.ResetRateCustomRankingCounter,
		0x51: DataStoreProtocolSuperMarioMaker.BestScoreRateCourseSearchObject,
		0x52: DataStoreProtocolSuperMarioMaker.CTRPickUpCourseSearchObject,
		0x53: DataStoreProtocolSuperMarioMaker.SetCachedRanking,
		0x54: DataStoreProtocolSuperMarioMaker.DeleteCachedRanking,
		0x55: DataStoreProtocolSuperMarioMaker.ChangePlayablePlatform,
		0x56: DataStoreProtocolSuperMarioMaker.SearchUnknownPlatformObjects,
		0x57: DataStoreProtocolSuperMarioMaker.ReportCourse
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = DataStoreProtocolSuperMarioMaker.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			DataStoreProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static GetObjectInfos(message: RMCMessage): typeof Methods.GetObjectInfos.Request | typeof Methods.GetObjectInfos.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetObjectInfos.Request;
		} else {
			return Methods.GetObjectInfos.Response;
		}
	}

	private static GetMetaByOwnerId(message: RMCMessage): typeof Methods.GetMetaByOwnerId.Request | typeof Methods.GetMetaByOwnerId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetMetaByOwnerId.Request;
		} else {
			return Methods.GetMetaByOwnerId.Response;
		}
	}

	private static CustomSearchObject(message: RMCMessage): typeof Methods.CustomSearchObject.Request | typeof Methods.CustomSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CustomSearchObject.Request;
		} else {
			return Methods.CustomSearchObject.Response;
		}
	}

	private static RateCustomRanking(message: RMCMessage): typeof Methods.RateCustomRanking.Request | typeof Methods.RateCustomRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RateCustomRanking.Request;
		} else {
			return Methods.RateCustomRanking.Response;
		}
	}

	private static GetCustomRanking(message: RMCMessage): typeof Methods.GetCustomRanking.Request | typeof Methods.GetCustomRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCustomRanking.Request;
		} else {
			return Methods.GetCustomRanking.Response;
		}
	}

	private static GetCustomRankingByDataId(message: RMCMessage): typeof Methods.GetCustomRankingByDataId.Request | typeof Methods.GetCustomRankingByDataId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCustomRankingByDataId.Request;
		} else {
			return Methods.GetCustomRankingByDataId.Response;
		}
	}

	private static DeleteCustomRanking(message: RMCMessage): typeof Methods.DeleteCustomRanking.Request | typeof Methods.DeleteCustomRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteCustomRanking.Request;
		} else {
			return Methods.DeleteCustomRanking.Response;
		}
	}

	private static AddToBufferQueue(message: RMCMessage): typeof Methods.AddToBufferQueue.Request | typeof Methods.AddToBufferQueue.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddToBufferQueue.Request;
		} else {
			return Methods.AddToBufferQueue.Response;
		}
	}

	private static AddToBufferQueues(message: RMCMessage): typeof Methods.AddToBufferQueues.Request | typeof Methods.AddToBufferQueues.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddToBufferQueues.Request;
		} else {
			return Methods.AddToBufferQueues.Response;
		}
	}

	private static GetBufferQueue(message: RMCMessage): typeof Methods.GetBufferQueue.Request | typeof Methods.GetBufferQueue.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetBufferQueue.Request;
		} else {
			return Methods.GetBufferQueue.Response;
		}
	}

	private static GetBufferQueues(message: RMCMessage): typeof Methods.GetBufferQueues.Request | typeof Methods.GetBufferQueues.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetBufferQueues.Request;
		} else {
			return Methods.GetBufferQueues.Response;
		}
	}

	private static ClearBufferQueues(message: RMCMessage): typeof Methods.ClearBufferQueues.Request | typeof Methods.ClearBufferQueues.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ClearBufferQueues.Request;
		} else {
			return Methods.ClearBufferQueues.Response;
		}
	}

	private static CompleteAttachFile(message: RMCMessage): typeof Methods.CompleteAttachFile.Request | typeof Methods.CompleteAttachFile.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompleteAttachFile.Request;
		} else {
			return Methods.CompleteAttachFile.Response;
		}
	}

	private static CompleteAttachFileV1(message: RMCMessage): typeof Methods.CompleteAttachFileV1.Request | typeof Methods.CompleteAttachFileV1.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompleteAttachFileV1.Request;
		} else {
			return Methods.CompleteAttachFileV1.Response;
		}
	}

	private static PrepareAttachFile(message: RMCMessage): typeof Methods.PrepareAttachFile.Request | typeof Methods.PrepareAttachFile.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PrepareAttachFile.Request;
		} else {
			return Methods.PrepareAttachFile.Response;
		}
	}

	private static ConditionalSearchObject(message: RMCMessage): typeof Methods.ConditionalSearchObject.Request | typeof Methods.ConditionalSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ConditionalSearchObject.Request;
		} else {
			return Methods.ConditionalSearchObject.Response;
		}
	}

	private static GetApplicationConfig(message: RMCMessage): typeof Methods.GetApplicationConfig.Request | typeof Methods.GetApplicationConfig.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetApplicationConfig.Request;
		} else {
			return Methods.GetApplicationConfig.Response;
		}
	}

	private static SetApplicationConfig(message: RMCMessage): typeof Methods.SetApplicationConfig.Request | typeof Methods.SetApplicationConfig.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SetApplicationConfig.Request;
		} else {
			return Methods.SetApplicationConfig.Response;
		}
	}

	private static DeleteApplicationConfig(message: RMCMessage): typeof Methods.DeleteApplicationConfig.Request | typeof Methods.DeleteApplicationConfig.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteApplicationConfig.Request;
		} else {
			return Methods.DeleteApplicationConfig.Response;
		}
	}

	private static LatestCourseSearchObject(message: RMCMessage): typeof Methods.LatestCourseSearchObject.Request | typeof Methods.LatestCourseSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.LatestCourseSearchObject.Request;
		} else {
			return Methods.LatestCourseSearchObject.Response;
		}
	}

	private static FollowingsLatestCourseSearchObject(message: RMCMessage): typeof Methods.FollowingsLatestCourseSearchObject.Request | typeof Methods.FollowingsLatestCourseSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FollowingsLatestCourseSearchObject.Request;
		} else {
			return Methods.FollowingsLatestCourseSearchObject.Response;
		}
	}

	private static RecommendedCourseSearchObject(message: RMCMessage): typeof Methods.RecommendedCourseSearchObject.Request | typeof Methods.RecommendedCourseSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RecommendedCourseSearchObject.Request;
		} else {
			return Methods.RecommendedCourseSearchObject.Response;
		}
	}

	private static ScoreRangeCascadedSearchObject(message: RMCMessage): typeof Methods.ScoreRangeCascadedSearchObject.Request | typeof Methods.ScoreRangeCascadedSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ScoreRangeCascadedSearchObject.Request;
		} else {
			return Methods.ScoreRangeCascadedSearchObject.Response;
		}
	}

	private static SuggestedCourseSearchObject(message: RMCMessage): typeof Methods.SuggestedCourseSearchObject.Request | typeof Methods.SuggestedCourseSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SuggestedCourseSearchObject.Request;
		} else {
			return Methods.SuggestedCourseSearchObject.Response;
		}
	}

	private static PreparePostObjectWithOwnerIdAndDataId(message: RMCMessage): typeof Methods.PreparePostObjectWithOwnerIdAndDataId.Request | typeof Methods.PreparePostObjectWithOwnerIdAndDataId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PreparePostObjectWithOwnerIdAndDataId.Request;
		} else {
			return Methods.PreparePostObjectWithOwnerIdAndDataId.Response;
		}
	}

	private static CompletePostObjectWithOwnerId(message: RMCMessage): typeof Methods.CompletePostObjectWithOwnerId.Request | typeof Methods.CompletePostObjectWithOwnerId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompletePostObjectWithOwnerId.Request;
		} else {
			return Methods.CompletePostObjectWithOwnerId.Response;
		}
	}

	private static UploadCourseRecord(message: RMCMessage): typeof Methods.UploadCourseRecord.Request | typeof Methods.UploadCourseRecord.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadCourseRecord.Request;
		} else {
			return Methods.UploadCourseRecord.Response;
		}
	}

	private static GetCourseRecord(message: RMCMessage): typeof Methods.GetCourseRecord.Request | typeof Methods.GetCourseRecord.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCourseRecord.Request;
		} else {
			return Methods.GetCourseRecord.Response;
		}
	}

	private static DeleteCourseRecord(message: RMCMessage): typeof Methods.DeleteCourseRecord.Request | typeof Methods.DeleteCourseRecord.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteCourseRecord.Request;
		} else {
			return Methods.DeleteCourseRecord.Response;
		}
	}

	private static GetApplicationConfigString(message: RMCMessage): typeof Methods.GetApplicationConfigString.Request | typeof Methods.GetApplicationConfigString.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetApplicationConfigString.Request;
		} else {
			return Methods.GetApplicationConfigString.Response;
		}
	}

	private static SetApplicationConfigString(message: RMCMessage): typeof Methods.SetApplicationConfigString.Request | typeof Methods.SetApplicationConfigString.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SetApplicationConfigString.Request;
		} else {
			return Methods.SetApplicationConfigString.Response;
		}
	}

	private static GetDeletionReason(message: RMCMessage): typeof Methods.GetDeletionReason.Request | typeof Methods.GetDeletionReason.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetDeletionReason.Request;
		} else {
			return Methods.GetDeletionReason.Response;
		}
	}

	private static SetDeletionReason(message: RMCMessage): typeof Methods.SetDeletionReason.Request | typeof Methods.SetDeletionReason.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SetDeletionReason.Request;
		} else {
			return Methods.SetDeletionReason.Response;
		}
	}

	private static GetMetasWithCourseRecord(message: RMCMessage): typeof Methods.GetMetasWithCourseRecord.Request | typeof Methods.GetMetasWithCourseRecord.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetMetasWithCourseRecord.Request;
		} else {
			return Methods.GetMetasWithCourseRecord.Response;
		}
	}

	private static CheckRateCustomRankingCounter(message: RMCMessage): typeof Methods.CheckRateCustomRankingCounter.Request | typeof Methods.CheckRateCustomRankingCounter.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CheckRateCustomRankingCounter.Request;
		} else {
			return Methods.CheckRateCustomRankingCounter.Response;
		}
	}

	private static ResetRateCustomRankingCounter(message: RMCMessage): typeof Methods.ResetRateCustomRankingCounter.Request | typeof Methods.ResetRateCustomRankingCounter.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ResetRateCustomRankingCounter.Request;
		} else {
			return Methods.ResetRateCustomRankingCounter.Response;
		}
	}

	private static BestScoreRateCourseSearchObject(message: RMCMessage): typeof Methods.BestScoreRateCourseSearchObject.Request | typeof Methods.BestScoreRateCourseSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.BestScoreRateCourseSearchObject.Request;
		} else {
			return Methods.BestScoreRateCourseSearchObject.Response;
		}
	}

	private static CTRPickUpCourseSearchObject(message: RMCMessage): typeof Methods.CTRPickUpCourseSearchObject.Request | typeof Methods.CTRPickUpCourseSearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CTRPickUpCourseSearchObject.Request;
		} else {
			return Methods.CTRPickUpCourseSearchObject.Response;
		}
	}

	private static SetCachedRanking(message: RMCMessage): typeof Methods.SetCachedRanking.Request | typeof Methods.SetCachedRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SetCachedRanking.Request;
		} else {
			return Methods.SetCachedRanking.Response;
		}
	}

	private static DeleteCachedRanking(message: RMCMessage): typeof Methods.DeleteCachedRanking.Request | typeof Methods.DeleteCachedRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteCachedRanking.Request;
		} else {
			return Methods.DeleteCachedRanking.Response;
		}
	}

	private static ChangePlayablePlatform(message: RMCMessage): typeof Methods.ChangePlayablePlatform.Request | typeof Methods.ChangePlayablePlatform.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ChangePlayablePlatform.Request;
		} else {
			return Methods.ChangePlayablePlatform.Response;
		}
	}

	private static SearchUnknownPlatformObjects(message: RMCMessage): typeof Methods.SearchUnknownPlatformObjects.Request | typeof Methods.SearchUnknownPlatformObjects.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchUnknownPlatformObjects.Request;
		} else {
			return Methods.SearchUnknownPlatformObjects.Response;
		}
	}

	private static ReportCourse(message: RMCMessage): typeof Methods.ReportCourse.Request | typeof Methods.ReportCourse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReportCourse.Request;
		} else {
			return Methods.ReportCourse.Response;
		}
	}
}
