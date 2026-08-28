import RMCMessage from '@/nex/rmc-message';
import OLSStorageProtocol from '@/nex/protocols/ols-storage';
import * as Methods from '@/nex/protocols/ols-storage/rayman-legends-challenges-app/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class OLSStorageProtocolRaymanLegendsChallengesApp {
	static ID = 0xC8;
	static Name = 'OLSStorage (Rayman Legends Challenges App)';

	static Methods = {
		LoadVersion: 0x1,
		SaveLocale: 0x2,
		SaveProfile: 0x3,
		LoadIDCard: 0x4,
		QueryFriendProfiles: 0x5,
		QueryUbisoftProfiles: 0x6,
		CreateMessage: 0x7,
		QueryMessage: 0x8,
		QueryLeaderboard: 0x9,
		QuerySmartSelection: 0xA,
		SaveScore: 0xB,
		SaveGhost: 0xC,
		QueryCompetitionsInfos: 0xD,
		QueryCompetitionsHistory: 0xE,
		QueryCompetitionOfTheDay: 0xF,
		QueryCompetition: 0x10
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: OLSStorageProtocolRaymanLegendsChallengesApp.LoadVersion,
		0x2: OLSStorageProtocolRaymanLegendsChallengesApp.SaveLocale,
		0x3: OLSStorageProtocolRaymanLegendsChallengesApp.SaveProfile,
		0x4: OLSStorageProtocolRaymanLegendsChallengesApp.LoadIDCard,
		0x5: OLSStorageProtocolRaymanLegendsChallengesApp.QueryFriendProfiles,
		0x6: OLSStorageProtocolRaymanLegendsChallengesApp.QueryUbisoftProfiles,
		0x7: OLSStorageProtocolRaymanLegendsChallengesApp.CreateMessage,
		0x8: OLSStorageProtocolRaymanLegendsChallengesApp.QueryMessage,
		0x9: OLSStorageProtocolRaymanLegendsChallengesApp.QueryLeaderboard,
		0xA: OLSStorageProtocolRaymanLegendsChallengesApp.QuerySmartSelection,
		0xB: OLSStorageProtocolRaymanLegendsChallengesApp.SaveScore,
		0xC: OLSStorageProtocolRaymanLegendsChallengesApp.SaveGhost,
		0xD: OLSStorageProtocolRaymanLegendsChallengesApp.QueryCompetitionsInfos,
		0xE: OLSStorageProtocolRaymanLegendsChallengesApp.QueryCompetitionsHistory,
		0xF: OLSStorageProtocolRaymanLegendsChallengesApp.QueryCompetitionOfTheDay,
		0x10: OLSStorageProtocolRaymanLegendsChallengesApp.QueryCompetition
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = OLSStorageProtocolRaymanLegendsChallengesApp.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			OLSStorageProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static LoadVersion(message: RMCMessage): typeof Methods.LoadVersion.Request | typeof Methods.LoadVersion.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.LoadVersion.Request;
		} else {
			return Methods.LoadVersion.Response;
		}
	}

	private static SaveLocale(message: RMCMessage): typeof Methods.SaveLocale.Request | typeof Methods.SaveLocale.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SaveLocale.Request;
		} else {
			return Methods.SaveLocale.Response;
		}
	}

	private static SaveProfile(message: RMCMessage): typeof Methods.SaveProfile.Request | typeof Methods.SaveProfile.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SaveProfile.Request;
		} else {
			return Methods.SaveProfile.Response;
		}
	}

	private static LoadIDCard(message: RMCMessage): typeof Methods.LoadIDCard.Request | typeof Methods.LoadIDCard.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.LoadIDCard.Request;
		} else {
			return Methods.LoadIDCard.Response;
		}
	}

	private static QueryFriendProfiles(message: RMCMessage): typeof Methods.QueryFriendProfiles.Request | typeof Methods.QueryFriendProfiles.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.QueryFriendProfiles.Request;
		} else {
			return Methods.QueryFriendProfiles.Response;
		}
	}

	private static QueryUbisoftProfiles(message: RMCMessage): typeof Methods.QueryUbisoftProfiles.Request | typeof Methods.QueryUbisoftProfiles.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.QueryUbisoftProfiles.Request;
		} else {
			return Methods.QueryUbisoftProfiles.Response;
		}
	}

	private static CreateMessage(message: RMCMessage): typeof Methods.CreateMessage.Request | typeof Methods.CreateMessage.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CreateMessage.Request;
		} else {
			return Methods.CreateMessage.Response;
		}
	}

	private static QueryMessage(message: RMCMessage): typeof Methods.QueryMessage.Request | typeof Methods.QueryMessage.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.QueryMessage.Request;
		} else {
			return Methods.QueryMessage.Response;
		}
	}

	private static QueryLeaderboard(message: RMCMessage): typeof Methods.QueryLeaderboard.Request | typeof Methods.QueryLeaderboard.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.QueryLeaderboard.Request;
		} else {
			return Methods.QueryLeaderboard.Response;
		}
	}

	private static QuerySmartSelection(message: RMCMessage): typeof Methods.QuerySmartSelection.Request | typeof Methods.QuerySmartSelection.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.QuerySmartSelection.Request;
		} else {
			return Methods.QuerySmartSelection.Response;
		}
	}

	private static SaveScore(message: RMCMessage): typeof Methods.SaveScore.Request | typeof Methods.SaveScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SaveScore.Request;
		} else {
			return Methods.SaveScore.Response;
		}
	}

	private static SaveGhost(message: RMCMessage): typeof Methods.SaveGhost.Request | typeof Methods.SaveGhost.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SaveGhost.Request;
		} else {
			return Methods.SaveGhost.Response;
		}
	}

	private static QueryCompetitionsInfos(message: RMCMessage): typeof Methods.QueryCompetitionsInfos.Request | typeof Methods.QueryCompetitionsInfos.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.QueryCompetitionsInfos.Request;
		} else {
			return Methods.QueryCompetitionsInfos.Response;
		}
	}

	private static QueryCompetitionsHistory(message: RMCMessage): typeof Methods.QueryCompetitionsHistory.Request | typeof Methods.QueryCompetitionsHistory.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.QueryCompetitionsHistory.Request;
		} else {
			return Methods.QueryCompetitionsHistory.Response;
		}
	}

	private static QueryCompetitionOfTheDay(message: RMCMessage): typeof Methods.QueryCompetitionOfTheDay.Request | typeof Methods.QueryCompetitionOfTheDay.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.QueryCompetitionOfTheDay.Request;
		} else {
			return Methods.QueryCompetitionOfTheDay.Response;
		}
	}

	private static QueryCompetition(message: RMCMessage): typeof Methods.QueryCompetition.Request | typeof Methods.QueryCompetition.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.QueryCompetition.Request;
		} else {
			return Methods.QueryCompetition.Response;
		}
	}
}
