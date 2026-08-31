import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVMap from '@/nex/types/map';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetRankingAnswerCount';

	private applicationId = new UInt32();
	private count = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.applicationId.extractFrom(stream);
		this.count.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			applicationId: this.applicationId,
			count: this.count
		};
	}
}

export class Response {
	public static Name = 'GetRankingAnswerCount';

	private pAnswerCount = new RVMap(new RVString(), new UInt32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pAnswerCount.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pAnswerCount: this.pAnswerCount
		};
	}
}
