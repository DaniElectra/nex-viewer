import NEXByteStream from '@/nex/byte-stream';
import Ranking2CommonData from '@/nex/protocols/ranking-2/types/ranking2-common-data';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PutCommonData';

	private commonData = new Ranking2CommonData();
	private nexUniqueId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.commonData.extractFrom(stream);
		this.nexUniqueId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			commonData: this.commonData,
			nexUniqueId: this.nexUniqueId
		};
	}
}

// * No response data
export class Response {
	public static Name = 'PutCommonData';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
