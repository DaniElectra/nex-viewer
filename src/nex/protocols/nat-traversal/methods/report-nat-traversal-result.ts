import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/int32';
import type RMCMessage from '@/nex/rmc-message';

export class Request {
	public static Name = 'ReportNATTraversalResult';

	private cid = new UInt32();
	private result = new Bool();
	private rtt: UInt32; // * Not seen on the 3DS. NEX version difference?

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title.settings);

		this.cid.extractFrom(stream);
		this.result.extractFrom(stream);

		if (stream.hasDataLeft()) {
			this.rtt = new UInt32();
			this.rtt.extractFrom(stream);
		}
	}

	public toJSON(): Record<string, any> {
		const json: Record<string, any> = {
			cid: this.cid,
			result: this.result,
			rtt: this.rtt
		};

		if (this.rtt !== undefined) {
			json.rtt = this.rtt;
		}

		return json;
	}
}

// * No response data
export class Response {
	public static Name = 'ReportNATTraversalResult';

	constructor() {}

	public toJSON(): Record<string, any> {
		return {};
	}
}