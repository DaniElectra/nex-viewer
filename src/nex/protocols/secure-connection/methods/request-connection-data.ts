import NEXByteStream from '@/nex/byte-stream';
import RMCMessage from '@/nex/rmc-message';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import List from '@/nex/types/list';
import ConnectionData from '@/nex/protocols/secure-connection/types/connection-data';

export class Request {
	public static Name = 'RequestConnectionData';

	private cidTarget = new UInt32();
	private pidTarget = new UInt32(); // TODO - Is this actually a PID type? Check the Switch

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title.settings);

		this.cidTarget.extractFrom(stream);
		this.pidTarget.extractFrom(stream);
	}

	public toJSON(): Record<string, any> {
		return {
			cidTarget: this.cidTarget,
			pidTarget: this.pidTarget
		};
	}
}

export class Response {
	public static Name = 'RequestConnectionData';

	private retval = new Bool();
	private pvecConnectionsData = new List(new ConnectionData());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title.settings);

		this.retval.extractFrom(stream);
		this.pvecConnectionsData.extractFrom(stream);
	}

	public toJSON(): Record<string, any> {
		return {
			retval: this.retval,
			pvecConnectionsData: this.pvecConnectionsData
		};
	}
}