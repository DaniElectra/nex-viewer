import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import RelationshipData from '@/nex/protocols/friends/types/relationship-data';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AddFriendWithDetails';

	private uiPlayer = new PID();
	private uiDetails = new UInt32();
	private strMessage = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uiPlayer.extractFrom(stream);
		this.uiDetails.extractFrom(stream);
		this.strMessage.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiPlayer: this.uiPlayer,
			uiDetails: this.uiDetails,
			strMessage: this.strMessage
		};
	}
}

export class Response {
	public static Name = 'AddFriendWithDetails';

	private relationshipData = new RelationshipData();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.relationshipData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			relationshipData: this.relationshipData
		};
	}
}
