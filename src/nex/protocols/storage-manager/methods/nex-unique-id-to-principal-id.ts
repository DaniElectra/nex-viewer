import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'NexUniqueIdToPrincipalId';

	private uniqueID = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.uniqueID.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uniqueID: this.uniqueID
		};
	}
}

export class Response {
	public static Name = 'NexUniqueIdToPrincipalId';

	private pid = new PID();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pid.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pid: this.pid
		};
	}
}
