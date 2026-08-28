import RMCMessage from '@/nex/rmc-message';
import DataStoreProtocol from '@/nex/protocols/datastore';
import * as Methods from '@/nex/protocols/datastore/xenoblade-chronicles-x/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class DataStoreProtocolXenobladeChroniclesX {
	static ID = 0x73;
	static Name = 'DataStore (Xenoblade Chronicles X)';

	static Methods = {
		SearchRentalObject: 0x2B,
		UploadRentalObject: 0x2C,
		GetRentalObject: 0x2D,
		DisableRentalObject: 0x2E,
		BorrowRentalObject: 0x2F,
		GetBorrowingRentalObject: 0x30,
		ReturnBorrowingRentalObject: 0x31,
		GetPeriodicRating: 0x32,
		RatePeriodicObject: 0x33,
		SearchRentalObjectByDataId: 0x34,
		SearchScheduledObject: 0x35,
		PostScheduledObject: 0x36,
		RequestPost_Lazy: 0x37,
		GetPeriodicRatingWithOffset: 0x38,
		RatePeriodicObjectWithOffset: 0x39,
		DebugUploadRentalObject: 0x3A,
		IsOliveCommunityExists: 0x3B,
		ReplaceMetaBinaryWithDataId: 0x3C,
		DebugChangeMeta: 0x3D
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x2B: DataStoreProtocolXenobladeChroniclesX.SearchRentalObject,
		0x2C: DataStoreProtocolXenobladeChroniclesX.UploadRentalObject,
		0x2D: DataStoreProtocolXenobladeChroniclesX.GetRentalObject,
		0x2E: DataStoreProtocolXenobladeChroniclesX.DisableRentalObject,
		0x2F: DataStoreProtocolXenobladeChroniclesX.BorrowRentalObject,
		0x30: DataStoreProtocolXenobladeChroniclesX.GetBorrowingRentalObject,
		0x31: DataStoreProtocolXenobladeChroniclesX.ReturnBorrowingRentalObject,
		0x32: DataStoreProtocolXenobladeChroniclesX.GetPeriodicRating,
		0x33: DataStoreProtocolXenobladeChroniclesX.RatePeriodicObject,
		0x34: DataStoreProtocolXenobladeChroniclesX.SearchRentalObjectByDataId,
		0x35: DataStoreProtocolXenobladeChroniclesX.SearchScheduledObject,
		0x36: DataStoreProtocolXenobladeChroniclesX.PostScheduledObject,
		0x37: DataStoreProtocolXenobladeChroniclesX.RequestPost_Lazy,
		0x38: DataStoreProtocolXenobladeChroniclesX.GetPeriodicRatingWithOffset,
		0x39: DataStoreProtocolXenobladeChroniclesX.RatePeriodicObjectWithOffset,
		0x3A: DataStoreProtocolXenobladeChroniclesX.DebugUploadRentalObject,
		0x3B: DataStoreProtocolXenobladeChroniclesX.IsOliveCommunityExists,
		0x3C: DataStoreProtocolXenobladeChroniclesX.ReplaceMetaBinaryWithDataId,
		0x3D: DataStoreProtocolXenobladeChroniclesX.DebugChangeMeta
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = DataStoreProtocolXenobladeChroniclesX.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			DataStoreProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static SearchRentalObject(message: RMCMessage): typeof Methods.SearchRentalObject.Request | typeof Methods.SearchRentalObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchRentalObject.Request;
		} else {
			return Methods.SearchRentalObject.Response;
		}
	}

	private static UploadRentalObject(message: RMCMessage): typeof Methods.UploadRentalObject.Request | typeof Methods.UploadRentalObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadRentalObject.Request;
		} else {
			return Methods.UploadRentalObject.Response;
		}
	}

	private static GetRentalObject(message: RMCMessage): typeof Methods.GetRentalObject.Request | typeof Methods.GetRentalObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRentalObject.Request;
		} else {
			return Methods.GetRentalObject.Response;
		}
	}

	private static DisableRentalObject(message: RMCMessage): typeof Methods.DisableRentalObject.Request | typeof Methods.DisableRentalObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DisableRentalObject.Request;
		} else {
			return Methods.DisableRentalObject.Response;
		}
	}

	private static BorrowRentalObject(message: RMCMessage): typeof Methods.BorrowRentalObject.Request | typeof Methods.BorrowRentalObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.BorrowRentalObject.Request;
		} else {
			return Methods.BorrowRentalObject.Response;
		}
	}

	private static GetBorrowingRentalObject(message: RMCMessage): typeof Methods.GetBorrowingRentalObject.Request | typeof Methods.GetBorrowingRentalObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetBorrowingRentalObject.Request;
		} else {
			return Methods.GetBorrowingRentalObject.Response;
		}
	}

	private static ReturnBorrowingRentalObject(message: RMCMessage): typeof Methods.ReturnBorrowingRentalObject.Request | typeof Methods.ReturnBorrowingRentalObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReturnBorrowingRentalObject.Request;
		} else {
			return Methods.ReturnBorrowingRentalObject.Response;
		}
	}

	private static GetPeriodicRating(message: RMCMessage): typeof Methods.GetPeriodicRating.Request | typeof Methods.GetPeriodicRating.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPeriodicRating.Request;
		} else {
			return Methods.GetPeriodicRating.Response;
		}
	}

	private static RatePeriodicObject(message: RMCMessage): typeof Methods.RatePeriodicObject.Request | typeof Methods.RatePeriodicObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RatePeriodicObject.Request;
		} else {
			return Methods.RatePeriodicObject.Response;
		}
	}

	private static SearchRentalObjectByDataId(message: RMCMessage): typeof Methods.SearchRentalObjectByDataId.Request | typeof Methods.SearchRentalObjectByDataId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchRentalObjectByDataId.Request;
		} else {
			return Methods.SearchRentalObjectByDataId.Response;
		}
	}

	private static SearchScheduledObject(message: RMCMessage): typeof Methods.SearchScheduledObject.Request | typeof Methods.SearchScheduledObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchScheduledObject.Request;
		} else {
			return Methods.SearchScheduledObject.Response;
		}
	}

	private static PostScheduledObject(message: RMCMessage): typeof Methods.PostScheduledObject.Request | typeof Methods.PostScheduledObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostScheduledObject.Request;
		} else {
			return Methods.PostScheduledObject.Response;
		}
	}

	private static RequestPost_Lazy(message: RMCMessage): typeof Methods.RequestPost_Lazy.Request | typeof Methods.RequestPost_Lazy.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RequestPost_Lazy.Request;
		} else {
			return Methods.RequestPost_Lazy.Response;
		}
	}

	private static GetPeriodicRatingWithOffset(message: RMCMessage): typeof Methods.GetPeriodicRatingWithOffset.Request | typeof Methods.GetPeriodicRatingWithOffset.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPeriodicRatingWithOffset.Request;
		} else {
			return Methods.GetPeriodicRatingWithOffset.Response;
		}
	}

	private static RatePeriodicObjectWithOffset(message: RMCMessage): typeof Methods.RatePeriodicObjectWithOffset.Request | typeof Methods.RatePeriodicObjectWithOffset.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RatePeriodicObjectWithOffset.Request;
		} else {
			return Methods.RatePeriodicObjectWithOffset.Response;
		}
	}

	private static DebugUploadRentalObject(message: RMCMessage): typeof Methods.DebugUploadRentalObject.Request | typeof Methods.DebugUploadRentalObject.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DebugUploadRentalObject.Request;
		} else {
			return Methods.DebugUploadRentalObject.Response;
		}
	}

	private static IsOliveCommunityExists(message: RMCMessage): typeof Methods.IsOliveCommunityExists.Request | typeof Methods.IsOliveCommunityExists.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.IsOliveCommunityExists.Request;
		} else {
			return Methods.IsOliveCommunityExists.Response;
		}
	}

	private static ReplaceMetaBinaryWithDataId(message: RMCMessage): typeof Methods.ReplaceMetaBinaryWithDataId.Request | typeof Methods.ReplaceMetaBinaryWithDataId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReplaceMetaBinaryWithDataId.Request;
		} else {
			return Methods.ReplaceMetaBinaryWithDataId.Response;
		}
	}

	private static DebugChangeMeta(message: RMCMessage): typeof Methods.DebugChangeMeta.Request | typeof Methods.DebugChangeMeta.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DebugChangeMeta.Request;
		} else {
			return Methods.DebugChangeMeta.Response;
		}
	}
}
