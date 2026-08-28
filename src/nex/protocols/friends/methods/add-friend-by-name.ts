import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AddFriendByName';

	private strPlayerName = new RVString();
	private uiDetails = new UInt32();
	private strMessage = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.strPlayerName.extractFrom(stream);
		this.uiDetails.extractFrom(stream);
		this.strMessage.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			strPlayerName: this.strPlayerName,
			uiDetails: this.uiDetails,
			strMessage: this.strMessage
		};
	}
}

export class Response {
	public static Name = 'AddFriendByName';

	private retval = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.retval.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			retval: this.retval
		};
	}
}
