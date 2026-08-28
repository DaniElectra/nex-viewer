import RMCMessage from '@/nex/rmc-message';
import DataStoreProtocol from '@/nex/protocols/datastore';
import * as Methods from '@/nex/protocols/datastore/real-escape-game-3ds/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class DataStoreProtocolRealEscapeGame3DS {
	static ID = 0x73;
	static Name = 'DataStore (Real Escape Game 3DS)';

	static Methods = {
		GetApplicationConfig: 0x2D,
		SetApplicationConfig: 0x2E,
		DeleteApplicationConfig: 0x2F,
		EntryShopRequest: 0x30,
		GetShopRequestInfo: 0x31,
		CancelShopRequest: 0x32,
		EntryCount: 0x33,
		GetCount: 0x34,
		EntryRanking: 0x35,
		GetRanking: 0x36,
		CancelRanking: 0x37,
		GetRankingAnswerCount: 0x38,
		InvalidateCounts: 0x39,
		InvalidateAllCounts: 0x3A,
		DeleteRankings: 0x3B,
		DeleteAllRankings: 0x3C
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x2D: DataStoreProtocolRealEscapeGame3DS.GetApplicationConfig,
		0x2E: DataStoreProtocolRealEscapeGame3DS.SetApplicationConfig,
		0x2F: DataStoreProtocolRealEscapeGame3DS.DeleteApplicationConfig,
		0x30: DataStoreProtocolRealEscapeGame3DS.EntryShopRequest,
		0x31: DataStoreProtocolRealEscapeGame3DS.GetShopRequestInfo,
		0x32: DataStoreProtocolRealEscapeGame3DS.CancelShopRequest,
		0x33: DataStoreProtocolRealEscapeGame3DS.EntryCount,
		0x34: DataStoreProtocolRealEscapeGame3DS.GetCount,
		0x35: DataStoreProtocolRealEscapeGame3DS.EntryRanking,
		0x36: DataStoreProtocolRealEscapeGame3DS.GetRanking,
		0x37: DataStoreProtocolRealEscapeGame3DS.CancelRanking,
		0x38: DataStoreProtocolRealEscapeGame3DS.GetRankingAnswerCount,
		0x39: DataStoreProtocolRealEscapeGame3DS.InvalidateCounts,
		0x3A: DataStoreProtocolRealEscapeGame3DS.InvalidateAllCounts,
		0x3B: DataStoreProtocolRealEscapeGame3DS.DeleteRankings,
		0x3C: DataStoreProtocolRealEscapeGame3DS.DeleteAllRankings
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = DataStoreProtocolRealEscapeGame3DS.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			DataStoreProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
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

	private static EntryShopRequest(message: RMCMessage): typeof Methods.EntryShopRequest.Request | typeof Methods.EntryShopRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.EntryShopRequest.Request;
		} else {
			return Methods.EntryShopRequest.Response;
		}
	}

	private static GetShopRequestInfo(message: RMCMessage): typeof Methods.GetShopRequestInfo.Request | typeof Methods.GetShopRequestInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetShopRequestInfo.Request;
		} else {
			return Methods.GetShopRequestInfo.Response;
		}
	}

	private static CancelShopRequest(message: RMCMessage): typeof Methods.CancelShopRequest.Request | typeof Methods.CancelShopRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CancelShopRequest.Request;
		} else {
			return Methods.CancelShopRequest.Response;
		}
	}

	private static EntryCount(message: RMCMessage): typeof Methods.EntryCount.Request | typeof Methods.EntryCount.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.EntryCount.Request;
		} else {
			return Methods.EntryCount.Response;
		}
	}

	private static GetCount(message: RMCMessage): typeof Methods.GetCount.Request | typeof Methods.GetCount.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCount.Request;
		} else {
			return Methods.GetCount.Response;
		}
	}

	private static EntryRanking(message: RMCMessage): typeof Methods.EntryRanking.Request | typeof Methods.EntryRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.EntryRanking.Request;
		} else {
			return Methods.EntryRanking.Response;
		}
	}

	private static GetRanking(message: RMCMessage): typeof Methods.GetRanking.Request | typeof Methods.GetRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRanking.Request;
		} else {
			return Methods.GetRanking.Response;
		}
	}

	private static CancelRanking(message: RMCMessage): typeof Methods.CancelRanking.Request | typeof Methods.CancelRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CancelRanking.Request;
		} else {
			return Methods.CancelRanking.Response;
		}
	}

	private static GetRankingAnswerCount(message: RMCMessage): typeof Methods.GetRankingAnswerCount.Request | typeof Methods.GetRankingAnswerCount.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRankingAnswerCount.Request;
		} else {
			return Methods.GetRankingAnswerCount.Response;
		}
	}

	private static InvalidateCounts(message: RMCMessage): typeof Methods.InvalidateCounts.Request | typeof Methods.InvalidateCounts.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.InvalidateCounts.Request;
		} else {
			return Methods.InvalidateCounts.Response;
		}
	}

	private static InvalidateAllCounts(message: RMCMessage): typeof Methods.InvalidateAllCounts.Request | typeof Methods.InvalidateAllCounts.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.InvalidateAllCounts.Request;
		} else {
			return Methods.InvalidateAllCounts.Response;
		}
	}

	private static DeleteRankings(message: RMCMessage): typeof Methods.DeleteRankings.Request | typeof Methods.DeleteRankings.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteRankings.Request;
		} else {
			return Methods.DeleteRankings.Response;
		}
	}

	private static DeleteAllRankings(message: RMCMessage): typeof Methods.DeleteAllRankings.Request | typeof Methods.DeleteAllRankings.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteAllRankings.Request;
		} else {
			return Methods.DeleteAllRankings.Response;
		}
	}
}
