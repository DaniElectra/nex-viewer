import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/ols-storage/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class OLSStorageProtocol {
	static ID = 0xC8;
	static Name = 'OLSStorage';

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
		SaveScoreInvasion: 0xC,
		SaveGhost: 0xD,
		QueryCompetitionsInfos: 0xE,
		QueryCompetitionsHistory: 0xF,
		QueryCompetitionOfTheDay: 0x10,
		SaveLevelProgression: 0x11
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: OLSStorageProtocol.LoadVersion,
		0x2: OLSStorageProtocol.SaveLocale,
		0x3: OLSStorageProtocol.SaveProfile,
		0x4: OLSStorageProtocol.LoadIDCard,
		0x5: OLSStorageProtocol.QueryFriendProfiles,
		0x6: OLSStorageProtocol.QueryUbisoftProfiles,
		0x7: OLSStorageProtocol.CreateMessage,
		0x8: OLSStorageProtocol.QueryMessage,
		0x9: OLSStorageProtocol.QueryLeaderboard,
		0xA: OLSStorageProtocol.QuerySmartSelection,
		0xB: OLSStorageProtocol.SaveScore,
		0xC: OLSStorageProtocol.SaveScoreInvasion,
		0xD: OLSStorageProtocol.SaveGhost,
		0xE: OLSStorageProtocol.QueryCompetitionsInfos,
		0xF: OLSStorageProtocol.QueryCompetitionsHistory,
		0x10: OLSStorageProtocol.QueryCompetitionOfTheDay,
		0x11: OLSStorageProtocol.SaveLevelProgression
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = OLSStorageProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
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

	private static SaveScoreInvasion(message: RMCMessage): typeof Methods.SaveScoreInvasion.Request | typeof Methods.SaveScoreInvasion.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SaveScoreInvasion.Request;
		} else {
			return Methods.SaveScoreInvasion.Response;
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

	private static SaveLevelProgression(message: RMCMessage): typeof Methods.SaveLevelProgression.Request | typeof Methods.SaveLevelProgression.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SaveLevelProgression.Request;
		} else {
			return Methods.SaveLevelProgression.Response;
		}
	}
}
