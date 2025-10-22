import NEXByteStream from '@/nex/byte-stream';
import NNAInfo from '@/nex/protocols/friends-wiiu/types/nna-info';
import NintendoPresenceV2 from '@/nex/protocols/friends-wiiu/types/nintendo-presence-v2';
import DateTime from '@/nex/types/datetime';
import PrincipalPreference from '@/nex/protocols/friends-wiiu/types/principal-preference';
import Comment from '@/nex/protocols/friends-wiiu/types/comment';
import List from '@/nex/types/list';
import FriendInfo from '@/nex/protocols/friends-wiiu/types/friend-info';
import FriendRequest from '@/nex/protocols/friends-wiiu/types/friend-request';
import BlacklistedPrincipal from '@/nex/protocols/friends-wiiu/types/blacklisted-principal';
import Bool from '@/nex/types/bool';
import PersistentNotification from '@/nex/protocols/friends-wiiu/types/persistent-notification';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateAndGetAllInformation';

	private NNAInfo = new NNAInfo();
	private nintendoPresence = new NintendoPresenceV2();
	private birthday = new DateTime();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.NNAInfo.extractFrom(stream);
		this.nintendoPresence.extractFrom(stream);
		this.birthday.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			NNAInfo: this.NNAInfo,
			nintendoPresence: this.nintendoPresence,
			birthday: this.birthday
		};
	}
}

export class Response {
	public static Name = 'UpdateAndGetAllInformation';

	private principalPreference = new PrincipalPreference();
	private comment = new Comment();
	private friendList = new List(new FriendInfo());
	private sentFriendRequests = new List(new FriendRequest());
	private receivedFriendRequests = new List(new FriendRequest());
	private blacklist = new List(new BlacklistedPrincipal());
	private unknown1 = new Bool();
	private notifications = new List(new PersistentNotification());
	private unknown2 = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.principalPreference.extractFrom(stream);
		this.comment.extractFrom(stream);
		this.friendList.extractFrom(stream);
		this.sentFriendRequests.extractFrom(stream);
		this.receivedFriendRequests.extractFrom(stream);
		this.blacklist.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.notifications.extractFrom(stream);
		this.unknown2.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			principalPreference: this.principalPreference,
			comment: this.comment,
			friendList: this.friendList,
			sentFriendRequests: this.sentFriendRequests,
			receivedFriendRequests: this.receivedFriendRequests,
			blacklist: this.blacklist,
			unknown1: this.unknown1,
			notifications: this.notifications,
			unknown2: this.unknown2
		};
	}
}
