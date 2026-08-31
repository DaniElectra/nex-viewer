import NEXByteStream from '@/nex/byte-stream';
import MiiV2 from '@/nex/protocols/friends-wiiu/types/mii-v2';
import DateTime from '@/nex/types/datetime';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateMii';

	private mii = new MiiV2();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.mii.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			mii: this.mii
		};
	}
}

export class Response {
	public static Name = 'UpdateMii';

	private unknown = new DateTime();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown: this.unknown
		};
	}
}
