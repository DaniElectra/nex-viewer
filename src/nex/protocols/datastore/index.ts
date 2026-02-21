import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/datastore/methods';
import type Packet from '@/types/nex/packet';

export default class DataStoreProtocol {
	static ID = 0x73;
	static Name = 'DataStore';

	static Methods = {
		PrepareGetObjectV1: 0x1,
		PreparePostObjectV1: 0x2,
		CompletePostObjectV1: 0x3,
		DeleteObject: 0x4,
		DeleteObjects: 0x5,
		ChangeMetaV1: 0x6,
		ChangeMetasV1: 0x7,
		GetMeta: 0x8,
		GetMetas: 0x9,
		PrepareUpdateObject: 0xA,
		CompleteUpdateObject: 0xB,
		SearchObject: 0xC,
		GetNotificationUrl: 0xD,
		GetNewArrivedNotificationsV1: 0xE,
		RateObject: 0xF,
		GetRating: 0x10,
		GetRatings: 0x11,
		ResetRating: 0x12,
		ResetRatings: 0x13,
		GetSpecificMetaV1: 0x14,
		PostMetaBinary: 0x15,
		TouchObject: 0x16,
		GetRatingWithLog: 0x17,
		PreparePostObject: 0x18,
		PrepareGetObject: 0x19,
		CompletePostObject: 0x1A,
		GetNewArrivedNotifications: 0x1B,
		GetSpecificMeta: 0x1C,
		GetPersistenceInfo: 0x1D,
		GetPersistenceInfos: 0x1E,
		PerpetuateObject: 0x1F,
		UnperpetuateObject: 0x20,
		PrepareGetObjectOrMetaBinary: 0x21,
		GetPasswordInfo: 0x22,
		GetPasswordInfos: 0x23,
		GetMetasMultipleParam: 0x24,
		CompletePostObjects: 0x25,
		ChangeMeta: 0x26,
		ChangeMetas: 0x27,
		RateObjects: 0x28,
		PostMetaBinaryWithDataId: 0x29,
		PostMetaBinariesWithDataId: 0x2A,
		RateObjectWithPosting: 0x2B,
		RateObjectsWithPosting: 0x2C,
		GetObjectInfos: 0x2D,
		SearchObjectLight: 0x2E
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: DataStoreProtocol.PrepareGetObjectV1,
		0x2: DataStoreProtocol.PreparePostObjectV1,
		0x3: DataStoreProtocol.CompletePostObjectV1,
		0x4: DataStoreProtocol.DeleteObject,
		0x5: DataStoreProtocol.DeleteObjects,
		0x6: DataStoreProtocol.ChangeMetaV1,
		0x7: DataStoreProtocol.ChangeMetasV1,
		0x8: DataStoreProtocol.GetMeta,
		0x9: DataStoreProtocol.GetMetas,
		0xA: DataStoreProtocol.PrepareUpdateObject,
		0xB: DataStoreProtocol.CompleteUpdateObject,
		0xC: DataStoreProtocol.SearchObject,
		0xD: DataStoreProtocol.GetNotificationUrl,
		0xE: DataStoreProtocol.GetNewArrivedNotificationsV1,
		0xF: DataStoreProtocol.RateObject,
		0x10: DataStoreProtocol.GetRating,
		0x11: DataStoreProtocol.GetRatings,
		0x12: DataStoreProtocol.ResetRating,
		0x13: DataStoreProtocol.ResetRatings,
		0x14: DataStoreProtocol.GetSpecificMetaV1,
		0x15: DataStoreProtocol.PostMetaBinary,
		0x16: DataStoreProtocol.TouchObject,
		0x17: DataStoreProtocol.GetRatingWithLog,
		0x18: DataStoreProtocol.PreparePostObject,
		0x19: DataStoreProtocol.PrepareGetObject,
		0x1A: DataStoreProtocol.CompletePostObject,
		0x1B: DataStoreProtocol.GetNewArrivedNotifications,
		0x1C: DataStoreProtocol.GetSpecificMeta,
		0x1D: DataStoreProtocol.GetPersistenceInfo,
		0x1E: DataStoreProtocol.GetPersistenceInfos,
		0x1F: DataStoreProtocol.PerpetuateObject,
		0x20: DataStoreProtocol.UnperpetuateObject,
		0x21: DataStoreProtocol.PrepareGetObjectOrMetaBinary,
		0x22: DataStoreProtocol.GetPasswordInfo,
		0x23: DataStoreProtocol.GetPasswordInfos,
		0x24: DataStoreProtocol.GetMetasMultipleParam,
		0x25: DataStoreProtocol.CompletePostObjects,
		0x26: DataStoreProtocol.ChangeMeta,
		0x27: DataStoreProtocol.ChangeMetas,
		0x28: DataStoreProtocol.RateObjects,
		0x29: DataStoreProtocol.PostMetaBinaryWithDataId,
		0x2A: DataStoreProtocol.PostMetaBinariesWithDataId,
		0x2B: DataStoreProtocol.RateObjectWithPosting,
		0x2C: DataStoreProtocol.RateObjectsWithPosting,
		0x2D: DataStoreProtocol.GetObjectInfos,
		0x2E: DataStoreProtocol.SearchObjectLight
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = DataStoreProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
	}

	private static PrepareGetObjectV1(message: RMCMessage): typeof Methods.PrepareGetObjectV1.Request | typeof Methods.PrepareGetObjectV1.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PrepareGetObjectV1.Request;
		} else {
			return Methods.PrepareGetObjectV1.Response;
		}
	}

	private static PreparePostObjectV1(message: RMCMessage): typeof Methods.PreparePostObjectV1.Request | typeof Methods.PreparePostObjectV1.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PreparePostObjectV1.Request;
		} else {
			return Methods.PreparePostObjectV1.Response;
		}
	}

	private static CompletePostObjectV1(message: RMCMessage): typeof Methods.CompletePostObjectV1.Request | typeof Methods.CompletePostObjectV1.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompletePostObjectV1.Request;
		} else {
			return Methods.CompletePostObjectV1.Response;
		}
	}

	private static DeleteObject(message: RMCMessage): typeof Methods.DeleteObject.Request | typeof Methods.DeleteObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteObject.Request;
		} else {
			return Methods.DeleteObject.Response;
		}
	}

	private static DeleteObjects(message: RMCMessage): typeof Methods.DeleteObjects.Request | typeof Methods.DeleteObjects.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteObjects.Request;
		} else {
			return Methods.DeleteObjects.Response;
		}
	}

	private static ChangeMetaV1(message: RMCMessage): typeof Methods.ChangeMetaV1.Request | typeof Methods.ChangeMetaV1.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ChangeMetaV1.Request;
		} else {
			return Methods.ChangeMetaV1.Response;
		}
	}

	private static ChangeMetasV1(message: RMCMessage): typeof Methods.ChangeMetasV1.Request | typeof Methods.ChangeMetasV1.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ChangeMetasV1.Request;
		} else {
			return Methods.ChangeMetasV1.Response;
		}
	}

	private static GetMeta(message: RMCMessage): typeof Methods.GetMeta.Request | typeof Methods.GetMeta.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetMeta.Request;
		} else {
			return Methods.GetMeta.Response;
		}
	}

	private static GetMetas(message: RMCMessage): typeof Methods.GetMetas.Request | typeof Methods.GetMetas.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetMetas.Request;
		} else {
			return Methods.GetMetas.Response;
		}
	}

	private static PrepareUpdateObject(message: RMCMessage): typeof Methods.PrepareUpdateObject.Request | typeof Methods.PrepareUpdateObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PrepareUpdateObject.Request;
		} else {
			return Methods.PrepareUpdateObject.Response;
		}
	}

	private static CompleteUpdateObject(message: RMCMessage): typeof Methods.CompleteUpdateObject.Request | typeof Methods.CompleteUpdateObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompleteUpdateObject.Request;
		} else {
			return Methods.CompleteUpdateObject.Response;
		}
	}

	private static SearchObject(message: RMCMessage): typeof Methods.SearchObject.Request | typeof Methods.SearchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchObject.Request;
		} else {
			return Methods.SearchObject.Response;
		}
	}

	private static GetNotificationUrl(message: RMCMessage): typeof Methods.GetNotificationUrl.Request | typeof Methods.GetNotificationUrl.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetNotificationUrl.Request;
		} else {
			return Methods.GetNotificationUrl.Response;
		}
	}

	private static GetNewArrivedNotificationsV1(message: RMCMessage): typeof Methods.GetNewArrivedNotificationsV1.Request | typeof Methods.GetNewArrivedNotificationsV1.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetNewArrivedNotificationsV1.Request;
		} else {
			return Methods.GetNewArrivedNotificationsV1.Response;
		}
	}

	private static RateObject(message: RMCMessage): typeof Methods.RateObject.Request | typeof Methods.RateObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RateObject.Request;
		} else {
			return Methods.RateObject.Response;
		}
	}

	private static GetRating(message: RMCMessage): typeof Methods.GetRating.Request | typeof Methods.GetRating.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRating.Request;
		} else {
			return Methods.GetRating.Response;
		}
	}

	private static GetRatings(message: RMCMessage): typeof Methods.GetRatings.Request | typeof Methods.GetRatings.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRatings.Request;
		} else {
			return Methods.GetRatings.Response;
		}
	}

	private static ResetRating(message: RMCMessage): typeof Methods.ResetRating.Request | typeof Methods.ResetRating.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ResetRating.Request;
		} else {
			return Methods.ResetRating.Response;
		}
	}

	private static ResetRatings(message: RMCMessage): typeof Methods.ResetRatings.Request | typeof Methods.ResetRatings.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ResetRatings.Request;
		} else {
			return Methods.ResetRatings.Response;
		}
	}

	private static GetSpecificMetaV1(message: RMCMessage): typeof Methods.GetSpecificMetaV1.Request | typeof Methods.GetSpecificMetaV1.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSpecificMetaV1.Request;
		} else {
			return Methods.GetSpecificMetaV1.Response;
		}
	}

	private static PostMetaBinary(message: RMCMessage): typeof Methods.PostMetaBinary.Request | typeof Methods.PostMetaBinary.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostMetaBinary.Request;
		} else {
			return Methods.PostMetaBinary.Response;
		}
	}

	private static TouchObject(message: RMCMessage): typeof Methods.TouchObject.Request | typeof Methods.TouchObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.TouchObject.Request;
		} else {
			return Methods.TouchObject.Response;
		}
	}

	private static GetRatingWithLog(message: RMCMessage): typeof Methods.GetRatingWithLog.Request | typeof Methods.GetRatingWithLog.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRatingWithLog.Request;
		} else {
			return Methods.GetRatingWithLog.Response;
		}
	}

	private static PreparePostObject(message: RMCMessage): typeof Methods.PreparePostObject.Request | typeof Methods.PreparePostObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PreparePostObject.Request;
		} else {
			return Methods.PreparePostObject.Response;
		}
	}

	private static PrepareGetObject(message: RMCMessage): typeof Methods.PrepareGetObject.Request | typeof Methods.PrepareGetObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PrepareGetObject.Request;
		} else {
			return Methods.PrepareGetObject.Response;
		}
	}

	private static CompletePostObject(message: RMCMessage): typeof Methods.CompletePostObject.Request | typeof Methods.CompletePostObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompletePostObject.Request;
		} else {
			return Methods.CompletePostObject.Response;
		}
	}

	private static GetNewArrivedNotifications(message: RMCMessage): typeof Methods.GetNewArrivedNotifications.Request | typeof Methods.GetNewArrivedNotifications.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetNewArrivedNotifications.Request;
		} else {
			return Methods.GetNewArrivedNotifications.Response;
		}
	}

	private static GetSpecificMeta(message: RMCMessage): typeof Methods.GetSpecificMeta.Request | typeof Methods.GetSpecificMeta.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSpecificMeta.Request;
		} else {
			return Methods.GetSpecificMeta.Response;
		}
	}

	private static GetPersistenceInfo(message: RMCMessage): typeof Methods.GetPersistenceInfo.Request | typeof Methods.GetPersistenceInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPersistenceInfo.Request;
		} else {
			return Methods.GetPersistenceInfo.Response;
		}
	}

	private static GetPersistenceInfos(message: RMCMessage): typeof Methods.GetPersistenceInfos.Request | typeof Methods.GetPersistenceInfos.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPersistenceInfos.Request;
		} else {
			return Methods.GetPersistenceInfos.Response;
		}
	}

	private static PerpetuateObject(message: RMCMessage): typeof Methods.PerpetuateObject.Request | typeof Methods.PerpetuateObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PerpetuateObject.Request;
		} else {
			return Methods.PerpetuateObject.Response;
		}
	}

	private static UnperpetuateObject(message: RMCMessage): typeof Methods.UnperpetuateObject.Request | typeof Methods.UnperpetuateObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnperpetuateObject.Request;
		} else {
			return Methods.UnperpetuateObject.Response;
		}
	}

	private static PrepareGetObjectOrMetaBinary(message: RMCMessage): typeof Methods.PrepareGetObjectOrMetaBinary.Request | typeof Methods.PrepareGetObjectOrMetaBinary.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PrepareGetObjectOrMetaBinary.Request;
		} else {
			return Methods.PrepareGetObjectOrMetaBinary.Response;
		}
	}

	private static GetPasswordInfo(message: RMCMessage): typeof Methods.GetPasswordInfo.Request | typeof Methods.GetPasswordInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPasswordInfo.Request;
		} else {
			return Methods.GetPasswordInfo.Response;
		}
	}

	private static GetPasswordInfos(message: RMCMessage): typeof Methods.GetPasswordInfos.Request | typeof Methods.GetPasswordInfos.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPasswordInfos.Request;
		} else {
			return Methods.GetPasswordInfos.Response;
		}
	}

	private static GetMetasMultipleParam(message: RMCMessage): typeof Methods.GetMetasMultipleParam.Request | typeof Methods.GetMetasMultipleParam.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetMetasMultipleParam.Request;
		} else {
			return Methods.GetMetasMultipleParam.Response;
		}
	}

	private static CompletePostObjects(message: RMCMessage): typeof Methods.CompletePostObjects.Request | typeof Methods.CompletePostObjects.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompletePostObjects.Request;
		} else {
			return Methods.CompletePostObjects.Response;
		}
	}

	private static ChangeMeta(message: RMCMessage): typeof Methods.ChangeMeta.Request | typeof Methods.ChangeMeta.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ChangeMeta.Request;
		} else {
			return Methods.ChangeMeta.Response;
		}
	}

	private static ChangeMetas(message: RMCMessage): typeof Methods.ChangeMetas.Request | typeof Methods.ChangeMetas.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ChangeMetas.Request;
		} else {
			return Methods.ChangeMetas.Response;
		}
	}

	private static RateObjects(message: RMCMessage): typeof Methods.RateObjects.Request | typeof Methods.RateObjects.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RateObjects.Request;
		} else {
			return Methods.RateObjects.Response;
		}
	}

	private static PostMetaBinaryWithDataId(message: RMCMessage): typeof Methods.PostMetaBinaryWithDataId.Request | typeof Methods.PostMetaBinaryWithDataId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostMetaBinaryWithDataId.Request;
		} else {
			return Methods.PostMetaBinaryWithDataId.Response;
		}
	}

	private static PostMetaBinariesWithDataId(message: RMCMessage): typeof Methods.PostMetaBinariesWithDataId.Request | typeof Methods.PostMetaBinariesWithDataId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostMetaBinariesWithDataId.Request;
		} else {
			return Methods.PostMetaBinariesWithDataId.Response;
		}
	}

	private static RateObjectWithPosting(message: RMCMessage): typeof Methods.RateObjectWithPosting.Request | typeof Methods.RateObjectWithPosting.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RateObjectWithPosting.Request;
		} else {
			return Methods.RateObjectWithPosting.Response;
		}
	}

	private static RateObjectsWithPosting(message: RMCMessage): typeof Methods.RateObjectsWithPosting.Request | typeof Methods.RateObjectsWithPosting.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RateObjectsWithPosting.Request;
		} else {
			return Methods.RateObjectsWithPosting.Response;
		}
	}

	private static GetObjectInfos(message: RMCMessage): typeof Methods.GetObjectInfos.Request | typeof Methods.GetObjectInfos.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetObjectInfos.Request;
		} else {
			return Methods.GetObjectInfos.Response;
		}
	}

	private static SearchObjectLight(message: RMCMessage): typeof Methods.SearchObjectLight.Request | typeof Methods.SearchObjectLight.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchObjectLight.Request;
		} else {
			return Methods.SearchObjectLight.Response;
		}
	}
}
