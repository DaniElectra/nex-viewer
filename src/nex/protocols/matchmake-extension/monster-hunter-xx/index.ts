import RMCMessage from '@/nex/rmc-message';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import * as Methods from '@/nex/protocols/matchmake-extension/monster-hunter-xx/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class MatchmakeExtensionProtocolMonsterHunterXX {
	static ID = 0x6D;
	static Name = 'MatchmakeExtension (Monster Hunter XX)';

	static Methods = {
		UpdateFriendUserProfile: 0x36,
		GetFriendUserProfiles: 0x37,
		GetFriends: 0x38,
		AddFriends: 0x39,
		RemoveFriend: 0x3A,
		FindCommunityByOwner: 0x3B
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x36: MatchmakeExtensionProtocolMonsterHunterXX.UpdateFriendUserProfile,
		0x37: MatchmakeExtensionProtocolMonsterHunterXX.GetFriendUserProfiles,
		0x38: MatchmakeExtensionProtocolMonsterHunterXX.GetFriends,
		0x39: MatchmakeExtensionProtocolMonsterHunterXX.AddFriends,
		0x3A: MatchmakeExtensionProtocolMonsterHunterXX.RemoveFriend,
		0x3B: MatchmakeExtensionProtocolMonsterHunterXX.FindCommunityByOwner
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeExtensionProtocolMonsterHunterXX.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			MatchmakeExtensionProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static UpdateFriendUserProfile(message: RMCMessage): typeof Methods.UpdateFriendUserProfile.Request | typeof Methods.UpdateFriendUserProfile.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateFriendUserProfile.Request;
		} else {
			return Methods.UpdateFriendUserProfile.Response;
		}
	}

	private static GetFriendUserProfiles(message: RMCMessage): typeof Methods.GetFriendUserProfiles.Request | typeof Methods.GetFriendUserProfiles.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFriendUserProfiles.Request;
		} else {
			return Methods.GetFriendUserProfiles.Response;
		}
	}

	private static GetFriends(message: RMCMessage): typeof Methods.GetFriends.Request | typeof Methods.GetFriends.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFriends.Request;
		} else {
			return Methods.GetFriends.Response;
		}
	}

	private static AddFriends(message: RMCMessage): typeof Methods.AddFriends.Request | typeof Methods.AddFriends.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddFriends.Request;
		} else {
			return Methods.AddFriends.Response;
		}
	}

	private static RemoveFriend(message: RMCMessage): typeof Methods.RemoveFriend.Request | typeof Methods.RemoveFriend.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RemoveFriend.Request;
		} else {
			return Methods.RemoveFriend.Response;
		}
	}

	private static FindCommunityByOwner(message: RMCMessage): typeof Methods.FindCommunityByOwner.Request | typeof Methods.FindCommunityByOwner.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.FindCommunityByOwner.Request;
		} else {
			return Methods.FindCommunityByOwner.Response;
		}
	}
}
