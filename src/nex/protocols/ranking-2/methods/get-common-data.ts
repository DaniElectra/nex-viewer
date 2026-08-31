import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import UInt64 from '@/nex/types/uint64';
import Ranking2CommonData from '@/nex/protocols/ranking-2/types/ranking2-common-data';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetCommonData';

	private optionFlags = new UInt32();
	private principalId = new PID();
	private nexUniqueId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.optionFlags.extractFrom(stream);
		this.principalId.extractFrom(stream);
		this.nexUniqueId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			optionFlags: this.optionFlags,
			principalId: this.principalId,
			nexUniqueId: this.nexUniqueId
		};
	}
}

export class Response {
	public static Name = 'GetCommonData';

	private commonData = new Ranking2CommonData();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.commonData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			commonData: this.commonData
		};
	}
}
