import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CheckRateCustomRankingCounter';

	private applicationId = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.applicationId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			applicationId: this.applicationId
		};
	}
}

export class Response {
	public static Name = 'CheckRateCustomRankingCounter';

	private isBelowThreshold = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.isBelowThreshold.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			isBelowThreshold: this.isBelowThreshold
		};
	}
}
