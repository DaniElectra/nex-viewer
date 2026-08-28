import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ClearRelationship';

	private uiPlayer = new PID();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uiPlayer.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiPlayer: this.uiPlayer
		};
	}
}

export class Response {
	public static Name = 'ClearRelationship';

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
