import NEXByteStream from '@/nex/byte-stream';
import RMCMessage from '@/nex/rmc-message';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import List from '@/nex/types/list';
import StationURL from '@/nex/types/station-url';

export class Request {
	public static Name = 'RequestUrls';

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
	public static Name = 'RequestUrls';

	private retval = new Bool();
	private plstURLs = new List(new StationURL()); // TODO - Is this actually a PID type? Check the Switch

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title.settings);

		this.retval.extractFrom(stream);
		this.plstURLs.extractFrom(stream);
	}

	public toJSON(): Record<string, any> {
		return {
			retval: this.retval,
			plstURLs: this.plstURLs
		};
	}
}