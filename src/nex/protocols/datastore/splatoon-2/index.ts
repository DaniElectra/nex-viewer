import RMCMessage from '@/nex/rmc-message';
import DataStoreProtocol from '@/nex/protocols/datastore';
import * as Methods from '@/nex/protocols/datastore/splatoon-2/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class DataStoreProtocolSplatoon2 {
	static ID = 0x73;
	static Name = 'DataStore (Splatoon 2)';

	static Methods = {
		CoconutRegisterMeta: 0x2F,
		CoconutRatePost: 0x30,
		CoconutGetObjectInfos: 0x31,
		CoconutReportViolation: 0x32,
		UploadRegularMatchResult: 0x33,
		UploadGachiMatchResult: 0x34,
		UploadLeagueMatchResult: 0x35,
		UploadFesMatchResult: 0x36,
		GetOrderedGear: 0x37,
		PurchaseGear: 0x38,
		UploadTimeAttack: 0x39,
		CoconutRegisterMetaByParam: 0x3A,
		UploadFesMatchResultV2: 0x3B,
		UploadXMatchResult: 0x3C,
		UploadRegularMatchResultV2: 0x3D,
		UploadGachiMatchResultV2: 0x3E,
		UploadLeagueMatchResultV2: 0x3F,
		UploadFesMatchResultV3: 0x40,
		UploadXMatchResultV2: 0x41,
		PreparePostPlayLog: 0x42,
		PrepareGetPlayLog: 0x43,
		UploadFesMatchResultV4: 0x44,
		UploadCoopResult: 0x45
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x2F: DataStoreProtocolSplatoon2.CoconutRegisterMeta,
		0x30: DataStoreProtocolSplatoon2.CoconutRatePost,
		0x31: DataStoreProtocolSplatoon2.CoconutGetObjectInfos,
		0x32: DataStoreProtocolSplatoon2.CoconutReportViolation,
		0x33: DataStoreProtocolSplatoon2.UploadRegularMatchResult,
		0x34: DataStoreProtocolSplatoon2.UploadGachiMatchResult,
		0x35: DataStoreProtocolSplatoon2.UploadLeagueMatchResult,
		0x36: DataStoreProtocolSplatoon2.UploadFesMatchResult,
		0x37: DataStoreProtocolSplatoon2.GetOrderedGear,
		0x38: DataStoreProtocolSplatoon2.PurchaseGear,
		0x39: DataStoreProtocolSplatoon2.UploadTimeAttack,
		0x3A: DataStoreProtocolSplatoon2.CoconutRegisterMetaByParam,
		0x3B: DataStoreProtocolSplatoon2.UploadFesMatchResultV2,
		0x3C: DataStoreProtocolSplatoon2.UploadXMatchResult,
		0x3D: DataStoreProtocolSplatoon2.UploadRegularMatchResultV2,
		0x3E: DataStoreProtocolSplatoon2.UploadGachiMatchResultV2,
		0x3F: DataStoreProtocolSplatoon2.UploadLeagueMatchResultV2,
		0x40: DataStoreProtocolSplatoon2.UploadFesMatchResultV3,
		0x41: DataStoreProtocolSplatoon2.UploadXMatchResultV2,
		0x42: DataStoreProtocolSplatoon2.PreparePostPlayLog,
		0x43: DataStoreProtocolSplatoon2.PrepareGetPlayLog,
		0x44: DataStoreProtocolSplatoon2.UploadFesMatchResultV4,
		0x45: DataStoreProtocolSplatoon2.UploadCoopResult
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = DataStoreProtocolSplatoon2.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			DataStoreProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static CoconutRegisterMeta(message: RMCMessage): typeof Methods.CoconutRegisterMeta.Request | typeof Methods.CoconutRegisterMeta.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CoconutRegisterMeta.Request;
		} else {
			return Methods.CoconutRegisterMeta.Response;
		}
	}

	private static CoconutRatePost(message: RMCMessage): typeof Methods.CoconutRatePost.Request | typeof Methods.CoconutRatePost.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CoconutRatePost.Request;
		} else {
			return Methods.CoconutRatePost.Response;
		}
	}

	private static CoconutGetObjectInfos(message: RMCMessage): typeof Methods.CoconutGetObjectInfos.Request | typeof Methods.CoconutGetObjectInfos.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CoconutGetObjectInfos.Request;
		} else {
			return Methods.CoconutGetObjectInfos.Response;
		}
	}

	private static CoconutReportViolation(message: RMCMessage): typeof Methods.CoconutReportViolation.Request | typeof Methods.CoconutReportViolation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CoconutReportViolation.Request;
		} else {
			return Methods.CoconutReportViolation.Response;
		}
	}

	private static UploadRegularMatchResult(message: RMCMessage): typeof Methods.UploadRegularMatchResult.Request | typeof Methods.UploadRegularMatchResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadRegularMatchResult.Request;
		} else {
			return Methods.UploadRegularMatchResult.Response;
		}
	}

	private static UploadGachiMatchResult(message: RMCMessage): typeof Methods.UploadGachiMatchResult.Request | typeof Methods.UploadGachiMatchResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadGachiMatchResult.Request;
		} else {
			return Methods.UploadGachiMatchResult.Response;
		}
	}

	private static UploadLeagueMatchResult(message: RMCMessage): typeof Methods.UploadLeagueMatchResult.Request | typeof Methods.UploadLeagueMatchResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadLeagueMatchResult.Request;
		} else {
			return Methods.UploadLeagueMatchResult.Response;
		}
	}

	private static UploadFesMatchResult(message: RMCMessage): typeof Methods.UploadFesMatchResult.Request | typeof Methods.UploadFesMatchResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadFesMatchResult.Request;
		} else {
			return Methods.UploadFesMatchResult.Response;
		}
	}

	private static GetOrderedGear(message: RMCMessage): typeof Methods.GetOrderedGear.Request | typeof Methods.GetOrderedGear.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetOrderedGear.Request;
		} else {
			return Methods.GetOrderedGear.Response;
		}
	}

	private static PurchaseGear(message: RMCMessage): typeof Methods.PurchaseGear.Request | typeof Methods.PurchaseGear.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PurchaseGear.Request;
		} else {
			return Methods.PurchaseGear.Response;
		}
	}

	private static UploadTimeAttack(message: RMCMessage): typeof Methods.UploadTimeAttack.Request | typeof Methods.UploadTimeAttack.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadTimeAttack.Request;
		} else {
			return Methods.UploadTimeAttack.Response;
		}
	}

	private static CoconutRegisterMetaByParam(message: RMCMessage): typeof Methods.CoconutRegisterMetaByParam.Request | typeof Methods.CoconutRegisterMetaByParam.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CoconutRegisterMetaByParam.Request;
		} else {
			return Methods.CoconutRegisterMetaByParam.Response;
		}
	}

	private static UploadFesMatchResultV2(message: RMCMessage): typeof Methods.UploadFesMatchResultV2.Request | typeof Methods.UploadFesMatchResultV2.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadFesMatchResultV2.Request;
		} else {
			return Methods.UploadFesMatchResultV2.Response;
		}
	}

	private static UploadXMatchResult(message: RMCMessage): typeof Methods.UploadXMatchResult.Request | typeof Methods.UploadXMatchResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadXMatchResult.Request;
		} else {
			return Methods.UploadXMatchResult.Response;
		}
	}

	private static UploadRegularMatchResultV2(message: RMCMessage): typeof Methods.UploadRegularMatchResultV2.Request | typeof Methods.UploadRegularMatchResultV2.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadRegularMatchResultV2.Request;
		} else {
			return Methods.UploadRegularMatchResultV2.Response;
		}
	}

	private static UploadGachiMatchResultV2(message: RMCMessage): typeof Methods.UploadGachiMatchResultV2.Request | typeof Methods.UploadGachiMatchResultV2.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadGachiMatchResultV2.Request;
		} else {
			return Methods.UploadGachiMatchResultV2.Response;
		}
	}

	private static UploadLeagueMatchResultV2(message: RMCMessage): typeof Methods.UploadLeagueMatchResultV2.Request | typeof Methods.UploadLeagueMatchResultV2.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadLeagueMatchResultV2.Request;
		} else {
			return Methods.UploadLeagueMatchResultV2.Response;
		}
	}

	private static UploadFesMatchResultV3(message: RMCMessage): typeof Methods.UploadFesMatchResultV3.Request | typeof Methods.UploadFesMatchResultV3.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadFesMatchResultV3.Request;
		} else {
			return Methods.UploadFesMatchResultV3.Response;
		}
	}

	private static UploadXMatchResultV2(message: RMCMessage): typeof Methods.UploadXMatchResultV2.Request | typeof Methods.UploadXMatchResultV2.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadXMatchResultV2.Request;
		} else {
			return Methods.UploadXMatchResultV2.Response;
		}
	}

	private static PreparePostPlayLog(message: RMCMessage): typeof Methods.PreparePostPlayLog.Request | typeof Methods.PreparePostPlayLog.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PreparePostPlayLog.Request;
		} else {
			return Methods.PreparePostPlayLog.Response;
		}
	}

	private static PrepareGetPlayLog(message: RMCMessage): typeof Methods.PrepareGetPlayLog.Request | typeof Methods.PrepareGetPlayLog.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PrepareGetPlayLog.Request;
		} else {
			return Methods.PrepareGetPlayLog.Response;
		}
	}

	private static UploadFesMatchResultV4(message: RMCMessage): typeof Methods.UploadFesMatchResultV4.Request | typeof Methods.UploadFesMatchResultV4.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadFesMatchResultV4.Request;
		} else {
			return Methods.UploadFesMatchResultV4.Response;
		}
	}

	private static UploadCoopResult(message: RMCMessage): typeof Methods.UploadCoopResult.Request | typeof Methods.UploadCoopResult.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadCoopResult.Request;
		} else {
			return Methods.UploadCoopResult.Response;
		}
	}
}
