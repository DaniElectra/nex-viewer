import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/matchmake-extension/close-participation';

export class Request {
	public static Name = 'CloseParticipation';

	private gid = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.gid.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			gid: this.gid
		};
	}
}

// * No response data
export class Response {
	public static Name = 'CloseParticipation';

	constructor() {}

	public toJSON(): RMCs.Response {
		return {};
	}
}