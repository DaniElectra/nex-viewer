import NEXByteStream from '@/nex/byte-stream';
import RMCMessage from '@/nex/rmc-message';
import UInt32 from '@/nex/types/uint32';

export class Request {
	public static Name = 'ReportNATProperties';

	private natmapping = new UInt32();
	private natfiltering = new UInt32();
	private rtt = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title.settings);

		this.natmapping.extractFrom(stream);
		this.natfiltering.extractFrom(stream);
		this.rtt.extractFrom(stream);
	}

	public toJSON(): Record<string, any> {
		return {
			natmapping: this.natmapping,
			natfiltering: this.natfiltering,
			rtt: this.rtt
		};
	}
}

// * No response data
export class Response {
	public static Name = 'ReportNATProperties';

	constructor() {}

	public toJSON(): Record<string, any> {
		return {};
	}
}