import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/friends/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class FriendsProtocol {
	static ID = 0x14;
	static Name = 'Friends';

	static Methods = {
		AddFriend: 0x1,
		AddFriendByName: 0x2,
		AddFriendWithDetails: 0x3,
		AddFriendByNameWithDetails: 0x4,
		AcceptFriendship: 0x5,
		DeclineFriendship: 0x6,
		BlackList: 0x7,
		BlackListByName: 0x8,
		ClearRelationship: 0x9,
		UpdateDetails: 0xA,
		GetList: 0xB,
		GetDetailedList: 0xC,
		GetRelationships: 0xD
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: FriendsProtocol.AddFriend,
		0x2: FriendsProtocol.AddFriendByName,
		0x3: FriendsProtocol.AddFriendWithDetails,
		0x4: FriendsProtocol.AddFriendByNameWithDetails,
		0x5: FriendsProtocol.AcceptFriendship,
		0x6: FriendsProtocol.DeclineFriendship,
		0x7: FriendsProtocol.BlackList,
		0x8: FriendsProtocol.BlackListByName,
		0x9: FriendsProtocol.ClearRelationship,
		0xA: FriendsProtocol.UpdateDetails,
		0xB: FriendsProtocol.GetList,
		0xC: FriendsProtocol.GetDetailedList,
		0xD: FriendsProtocol.GetRelationships
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = FriendsProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static AddFriend(message: RMCMessage): typeof Methods.AddFriend.Request | typeof Methods.AddFriend.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddFriend.Request;
		} else {
			return Methods.AddFriend.Response;
		}
	}

	private static AddFriendByName(message: RMCMessage): typeof Methods.AddFriendByName.Request | typeof Methods.AddFriendByName.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddFriendByName.Request;
		} else {
			return Methods.AddFriendByName.Response;
		}
	}

	private static AddFriendWithDetails(message: RMCMessage): typeof Methods.AddFriendWithDetails.Request | typeof Methods.AddFriendWithDetails.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddFriendWithDetails.Request;
		} else {
			return Methods.AddFriendWithDetails.Response;
		}
	}

	private static AddFriendByNameWithDetails(message: RMCMessage): typeof Methods.AddFriendByNameWithDetails.Request | typeof Methods.AddFriendByNameWithDetails.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AddFriendByNameWithDetails.Request;
		} else {
			return Methods.AddFriendByNameWithDetails.Response;
		}
	}

	private static AcceptFriendship(message: RMCMessage): typeof Methods.AcceptFriendship.Request | typeof Methods.AcceptFriendship.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AcceptFriendship.Request;
		} else {
			return Methods.AcceptFriendship.Response;
		}
	}

	private static DeclineFriendship(message: RMCMessage): typeof Methods.DeclineFriendship.Request | typeof Methods.DeclineFriendship.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeclineFriendship.Request;
		} else {
			return Methods.DeclineFriendship.Response;
		}
	}

	private static BlackList(message: RMCMessage): typeof Methods.BlackList.Request | typeof Methods.BlackList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.BlackList.Request;
		} else {
			return Methods.BlackList.Response;
		}
	}

	private static BlackListByName(message: RMCMessage): typeof Methods.BlackListByName.Request | typeof Methods.BlackListByName.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.BlackListByName.Request;
		} else {
			return Methods.BlackListByName.Response;
		}
	}

	private static ClearRelationship(message: RMCMessage): typeof Methods.ClearRelationship.Request | typeof Methods.ClearRelationship.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ClearRelationship.Request;
		} else {
			return Methods.ClearRelationship.Response;
		}
	}

	private static UpdateDetails(message: RMCMessage): typeof Methods.UpdateDetails.Request | typeof Methods.UpdateDetails.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateDetails.Request;
		} else {
			return Methods.UpdateDetails.Response;
		}
	}

	private static GetList(message: RMCMessage): typeof Methods.GetList.Request | typeof Methods.GetList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetList.Request;
		} else {
			return Methods.GetList.Response;
		}
	}

	private static GetDetailedList(message: RMCMessage): typeof Methods.GetDetailedList.Request | typeof Methods.GetDetailedList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetDetailedList.Request;
		} else {
			return Methods.GetDetailedList.Response;
		}
	}

	private static GetRelationships(message: RMCMessage): typeof Methods.GetRelationships.Request | typeof Methods.GetRelationships.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRelationships.Request;
		} else {
			return Methods.GetRelationships.Response;
		}
	}
}
