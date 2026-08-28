import NEXByteStream from '@/nex/byte-stream';
import QBuffer from '@/nex/types/qbuffer';
import BufferQueueParam from '@/nex/protocols/datastore/animal-crossing-happy-home-designer/types/buffer-queue-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AddToBufferQueue';

	private param = new BufferQueueParam();
	private buffer = new QBuffer();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
		this.buffer.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param,
			buffer: this.buffer
		};
	}
}

// * No response data
export class Response {
	public static Name = 'AddToBufferQueue';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
