import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/subscriber/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class SubscriberProtocol {
	static ID = 0x79;
	static Name = 'Subscriber';

	static Methods = {
		Hello: 0x1,
		PostContent: 0x2,
		GetContent: 0x3,
		Follow: 0x4,
		UnfollowAllAndFollow: 0x5,
		Unfollow: 0x6,
		GetFollowing: 0x7,
		GetFollower: 0x8,
		GetNumFollowers: 0x9,
		GetTimeline: 0xA,
		DeleteContent: 0xB,
		GetContentMulti: 0xC,
		UpdateUserStatus: 0xD,
		GetFriendUserStatuses: 0xE,
		GetUserStatuses: 0xF
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: SubscriberProtocol.Hello,
		0x2: SubscriberProtocol.PostContent,
		0x3: SubscriberProtocol.GetContent,
		0x4: SubscriberProtocol.Follow,
		0x5: SubscriberProtocol.UnfollowAllAndFollow,
		0x6: SubscriberProtocol.Unfollow,
		0x7: SubscriberProtocol.GetFollowing,
		0x8: SubscriberProtocol.GetFollower,
		0x9: SubscriberProtocol.GetNumFollowers,
		0xA: SubscriberProtocol.GetTimeline,
		0xB: SubscriberProtocol.DeleteContent,
		0xC: SubscriberProtocol.GetContentMulti,
		0xD: SubscriberProtocol.UpdateUserStatus,
		0xE: SubscriberProtocol.GetFriendUserStatuses,
		0xF: SubscriberProtocol.GetUserStatuses
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = SubscriberProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static Hello(message: RMCMessage): typeof Methods.Hello.Request | typeof Methods.Hello.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.Hello.Request;
		} else {
			return Methods.Hello.Response;
		}
	}

	private static PostContent(message: RMCMessage): typeof Methods.PostContent.Request | typeof Methods.PostContent.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostContent.Request;
		} else {
			return Methods.PostContent.Response;
		}
	}

	private static GetContent(message: RMCMessage): typeof Methods.GetContent.Request | typeof Methods.GetContent.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetContent.Request;
		} else {
			return Methods.GetContent.Response;
		}
	}

	private static Follow(message: RMCMessage): typeof Methods.Follow.Request | typeof Methods.Follow.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.Follow.Request;
		} else {
			return Methods.Follow.Response;
		}
	}

	private static UnfollowAllAndFollow(message: RMCMessage): typeof Methods.UnfollowAllAndFollow.Request | typeof Methods.UnfollowAllAndFollow.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnfollowAllAndFollow.Request;
		} else {
			return Methods.UnfollowAllAndFollow.Response;
		}
	}

	private static Unfollow(message: RMCMessage): typeof Methods.Unfollow.Request | typeof Methods.Unfollow.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.Unfollow.Request;
		} else {
			return Methods.Unfollow.Response;
		}
	}

	private static GetFollowing(message: RMCMessage): typeof Methods.GetFollowing.Request | typeof Methods.GetFollowing.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFollowing.Request;
		} else {
			return Methods.GetFollowing.Response;
		}
	}

	private static GetFollower(message: RMCMessage): typeof Methods.GetFollower.Request | typeof Methods.GetFollower.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFollower.Request;
		} else {
			return Methods.GetFollower.Response;
		}
	}

	private static GetNumFollowers(message: RMCMessage): typeof Methods.GetNumFollowers.Request | typeof Methods.GetNumFollowers.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetNumFollowers.Request;
		} else {
			return Methods.GetNumFollowers.Response;
		}
	}

	private static GetTimeline(message: RMCMessage): typeof Methods.GetTimeline.Request | typeof Methods.GetTimeline.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetTimeline.Request;
		} else {
			return Methods.GetTimeline.Response;
		}
	}

	private static DeleteContent(message: RMCMessage): typeof Methods.DeleteContent.Request | typeof Methods.DeleteContent.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteContent.Request;
		} else {
			return Methods.DeleteContent.Response;
		}
	}

	private static GetContentMulti(message: RMCMessage): typeof Methods.GetContentMulti.Request | typeof Methods.GetContentMulti.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetContentMulti.Request;
		} else {
			return Methods.GetContentMulti.Response;
		}
	}

	private static UpdateUserStatus(message: RMCMessage): typeof Methods.UpdateUserStatus.Request | typeof Methods.UpdateUserStatus.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateUserStatus.Request;
		} else {
			return Methods.UpdateUserStatus.Response;
		}
	}

	private static GetFriendUserStatuses(message: RMCMessage): typeof Methods.GetFriendUserStatuses.Request | typeof Methods.GetFriendUserStatuses.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetFriendUserStatuses.Request;
		} else {
			return Methods.GetFriendUserStatuses.Response;
		}
	}

	private static GetUserStatuses(message: RMCMessage): typeof Methods.GetUserStatuses.Request | typeof Methods.GetUserStatuses.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetUserStatuses.Request;
		} else {
			return Methods.GetUserStatuses.Response;
		}
	}
}
