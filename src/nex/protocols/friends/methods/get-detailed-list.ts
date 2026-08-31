import NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';
import Bool from '@/nex/types/bool';
import List from '@/nex/types/list';
import FriendData from '@/nex/protocols/friends/types/friend-data';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetDetailedList';

	private byRelationship = new UInt8();
	private bReversed = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.byRelationship.extractFrom(stream);
		this.bReversed.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			byRelationship: this.byRelationship,
			bReversed: this.bReversed
		};
	}
}

export class Response {
	public static Name = 'GetDetailedList';

	private lstFriendsList = new List(new FriendData());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.lstFriendsList.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstFriendsList: this.lstFriendsList
		};
	}
}
