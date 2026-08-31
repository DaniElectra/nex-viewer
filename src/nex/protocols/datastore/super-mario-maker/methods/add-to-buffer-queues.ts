import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import QBuffer from '@/nex/types/qbuffer';
import QResult from '@/nex/types/qresult';
import BufferQueueParam from '@/nex/protocols/datastore/super-mario-maker/types/buffer-queue-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AddToBufferQueues';

	private params = new List(new BufferQueueParam());
	private buffers = new List(new QBuffer());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.params.extractFrom(stream);
		this.buffers.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			params: this.params,
			buffers: this.buffers
		};
	}
}

export class Response {
	public static Name = 'AddToBufferQueues';

	private pResults = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pResults.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pResults: this.pResults
		};
	}
}
