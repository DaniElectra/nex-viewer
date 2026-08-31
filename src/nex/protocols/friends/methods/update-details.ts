import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateDetails';

	private uiPlayer = new PID();
	private uiDetails = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uiPlayer.extractFrom(stream);
		this.uiDetails.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiPlayer: this.uiPlayer,
			uiDetails: this.uiDetails
		};
	}
}

export class Response {
	public static Name = 'UpdateDetails';

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
