import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import QBuffer from '@/nex/types/qbuffer';
import BufferQueueParam from '@/nex/protocols/datastore/animal-crossing-happy-home-designer/types/buffer-queue-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetBufferQueue';

	private param = new BufferQueueParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param
		};
	}
}

export class Response {
	public static Name = 'GetBufferQueue';

	private pBufferQueue = new List(new QBuffer());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pBufferQueue.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pBufferQueue: this.pBufferQueue
		};
	}
}
