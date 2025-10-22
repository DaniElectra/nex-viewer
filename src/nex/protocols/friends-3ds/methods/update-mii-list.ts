import NEXByteStream from '@/nex/byte-stream';
import MiiList from '@/nex/protocols/friends-3ds/types/mii-list';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateMiiList';

	private miiList = new MiiList();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.miiList.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			miiList: this.miiList
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateMiiList';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
