import RMCMessage from '@/nex/rmc-message';
import DataStoreProtocol from '@/nex/protocols/datastore';
import * as Methods from '@/nex/protocols/datastore/super-smash-bros-4/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class DataStoreProtocolSuperSmashBros4 {
	static ID = 0x73;
	static Name = 'DataStore (Super Smash Bros. 4)';

	static Methods = {
		PostProfile: 0x2D,
		GetProfiles: 0x2E,
		SendPlayReport: 0x2F,
		GetWorldPlayReport: 0x30,
		GetReplayMeta: 0x31,
		PrepareGetReplay: 0x32,
		PreparePostReplay: 0x33,
		CompletePostReplay: 0x34,
		CheckPostReplay: 0x35,
		GetNextReplay: 0x36,
		PreparePostSharedData: 0x37,
		CompletePostSharedData: 0x38,
		SearchSharedData: 0x39,
		GetApplicationConfig: 0x3A,
		SearchReplay: 0x3B,
		PostFightingPowerScore: 0x3C,
		GetFightingPowerChart: 0x3D,
		GetFightingPowerChartAll: 0x3E,
		ReportSharedData: 0x3F,
		GetSharedDataMeta: 0x40
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x2D: DataStoreProtocolSuperSmashBros4.PostProfile,
		0x2E: DataStoreProtocolSuperSmashBros4.GetProfiles,
		0x2F: DataStoreProtocolSuperSmashBros4.SendPlayReport,
		0x30: DataStoreProtocolSuperSmashBros4.GetWorldPlayReport,
		0x31: DataStoreProtocolSuperSmashBros4.GetReplayMeta,
		0x32: DataStoreProtocolSuperSmashBros4.PrepareGetReplay,
		0x33: DataStoreProtocolSuperSmashBros4.PreparePostReplay,
		0x34: DataStoreProtocolSuperSmashBros4.CompletePostReplay,
		0x35: DataStoreProtocolSuperSmashBros4.CheckPostReplay,
		0x36: DataStoreProtocolSuperSmashBros4.GetNextReplay,
		0x37: DataStoreProtocolSuperSmashBros4.PreparePostSharedData,
		0x38: DataStoreProtocolSuperSmashBros4.CompletePostSharedData,
		0x39: DataStoreProtocolSuperSmashBros4.SearchSharedData,
		0x3A: DataStoreProtocolSuperSmashBros4.GetApplicationConfig,
		0x3B: DataStoreProtocolSuperSmashBros4.SearchReplay,
		0x3C: DataStoreProtocolSuperSmashBros4.PostFightingPowerScore,
		0x3D: DataStoreProtocolSuperSmashBros4.GetFightingPowerChart,
		0x3E: DataStoreProtocolSuperSmashBros4.GetFightingPowerChartAll,
		0x3F: DataStoreProtocolSuperSmashBros4.ReportSharedData,
		0x40: DataStoreProtocolSuperSmashBros4.GetSharedDataMeta
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = DataStoreProtocolSuperSmashBros4.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			DataStoreProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static PostProfile(message: RMCMessage): typeof Methods.PostProfile.Request | typeof Methods.PostProfile.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostProfile.Request;
		} else {
			return Methods.PostProfile.Response;
		}
	}

	private static GetProfiles(message: RMCMessage): typeof Methods.GetProfiles.Request | typeof Methods.GetProfiles.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetProfiles.Request;
		} else {
			return Methods.GetProfiles.Response;
		}
	}

	private static SendPlayReport(message: RMCMessage): typeof Methods.SendPlayReport.Request | typeof Methods.SendPlayReport.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SendPlayReport.Request;
		} else {
			return Methods.SendPlayReport.Response;
		}
	}

	private static GetWorldPlayReport(message: RMCMessage): typeof Methods.GetWorldPlayReport.Request | typeof Methods.GetWorldPlayReport.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetWorldPlayReport.Request;
		} else {
			return Methods.GetWorldPlayReport.Response;
		}
	}

	private static GetReplayMeta(message: RMCMessage): typeof Methods.GetReplayMeta.Request | typeof Methods.GetReplayMeta.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetReplayMeta.Request;
		} else {
			return Methods.GetReplayMeta.Response;
		}
	}

	private static PrepareGetReplay(message: RMCMessage): typeof Methods.PrepareGetReplay.Request | typeof Methods.PrepareGetReplay.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PrepareGetReplay.Request;
		} else {
			return Methods.PrepareGetReplay.Response;
		}
	}

	private static PreparePostReplay(message: RMCMessage): typeof Methods.PreparePostReplay.Request | typeof Methods.PreparePostReplay.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PreparePostReplay.Request;
		} else {
			return Methods.PreparePostReplay.Response;
		}
	}

	private static CompletePostReplay(message: RMCMessage): typeof Methods.CompletePostReplay.Request | typeof Methods.CompletePostReplay.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompletePostReplay.Request;
		} else {
			return Methods.CompletePostReplay.Response;
		}
	}

	private static CheckPostReplay(message: RMCMessage): typeof Methods.CheckPostReplay.Request | typeof Methods.CheckPostReplay.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CheckPostReplay.Request;
		} else {
			return Methods.CheckPostReplay.Response;
		}
	}

	private static GetNextReplay(message: RMCMessage): typeof Methods.GetNextReplay.Request | typeof Methods.GetNextReplay.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetNextReplay.Request;
		} else {
			return Methods.GetNextReplay.Response;
		}
	}

	private static PreparePostSharedData(message: RMCMessage): typeof Methods.PreparePostSharedData.Request | typeof Methods.PreparePostSharedData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PreparePostSharedData.Request;
		} else {
			return Methods.PreparePostSharedData.Response;
		}
	}

	private static CompletePostSharedData(message: RMCMessage): typeof Methods.CompletePostSharedData.Request | typeof Methods.CompletePostSharedData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CompletePostSharedData.Request;
		} else {
			return Methods.CompletePostSharedData.Response;
		}
	}

	private static SearchSharedData(message: RMCMessage): typeof Methods.SearchSharedData.Request | typeof Methods.SearchSharedData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchSharedData.Request;
		} else {
			return Methods.SearchSharedData.Response;
		}
	}

	private static GetApplicationConfig(message: RMCMessage): typeof Methods.GetApplicationConfig.Request | typeof Methods.GetApplicationConfig.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetApplicationConfig.Request;
		} else {
			return Methods.GetApplicationConfig.Response;
		}
	}

	private static SearchReplay(message: RMCMessage): typeof Methods.SearchReplay.Request | typeof Methods.SearchReplay.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchReplay.Request;
		} else {
			return Methods.SearchReplay.Response;
		}
	}

	private static PostFightingPowerScore(message: RMCMessage): typeof Methods.PostFightingPowerScore.Request | typeof Methods.PostFightingPowerScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostFightingPowerScore.Request;
		} else {
			return Methods.PostFightingPowerScore.Response;
		}
	}

	private static GetFightingPowerChart(message: RMCMessage): typeof Methods.GetFightingPowerChart.Request | typeof Methods.GetFightingPowerChart.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFightingPowerChart.Request;
		} else {
			return Methods.GetFightingPowerChart.Response;
		}
	}

	private static GetFightingPowerChartAll(message: RMCMessage): typeof Methods.GetFightingPowerChartAll.Request | typeof Methods.GetFightingPowerChartAll.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFightingPowerChartAll.Request;
		} else {
			return Methods.GetFightingPowerChartAll.Response;
		}
	}

	private static ReportSharedData(message: RMCMessage): typeof Methods.ReportSharedData.Request | typeof Methods.ReportSharedData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReportSharedData.Request;
		} else {
			return Methods.ReportSharedData.Response;
		}
	}

	private static GetSharedDataMeta(message: RMCMessage): typeof Methods.GetSharedDataMeta.Request | typeof Methods.GetSharedDataMeta.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSharedDataMeta.Request;
		} else {
			return Methods.GetSharedDataMeta.Response;
		}
	}
}
