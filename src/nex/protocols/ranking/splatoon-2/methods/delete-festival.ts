import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeleteFestival';

	private festivalId = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.festivalId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			festivalId: this.festivalId
		};
	}
}

// * No response data
export class Response {
	public static Name = 'DeleteFestival';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
