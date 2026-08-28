import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CancelSimpleMatchmakeEntry';

	private groupId = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.groupId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			groupId: this.groupId
		};
	}
}

export class Response {
	public static Name = 'CancelSimpleMatchmakeEntry';

	private succeed = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.succeed.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			succeed: this.succeed
		};
	}
}
