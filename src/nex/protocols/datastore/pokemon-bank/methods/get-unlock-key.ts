import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetUnlockKey';

	private challengeValue = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.challengeValue.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			challengeValue: this.challengeValue
		};
	}
}

export class Response {
	public static Name = 'GetUnlockKey';

	private pUnlockKeyList = new List(new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pUnlockKeyList.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pUnlockKeyList: this.pUnlockKeyList
		};
	}
}
