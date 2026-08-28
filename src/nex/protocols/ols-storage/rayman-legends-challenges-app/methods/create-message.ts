import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import Int32 from '@/nex/types/int32';
import OLSAttribute from '@/nex/protocols/ols-storage/rayman-legends-challenges-app/types/ols-attribute';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CreateMessage';

	private message_type = new UInt32();
	private receivers = new List(new Int32());
	private attributes = new List(new OLSAttribute());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.message_type.extractFrom(stream);
		this.receivers.extractFrom(stream);
		this.attributes.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			message_type: this.message_type,
			receivers: this.receivers,
			attributes: this.attributes
		};
	}
}

// * No response data
export class Response {
	public static Name = 'CreateMessage';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
