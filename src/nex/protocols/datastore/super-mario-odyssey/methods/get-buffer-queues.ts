import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import QBuffer from '@/nex/types/qbuffer';
import QResult from '@/nex/types/qresult';
import BufferQueueParam from '@/nex/protocols/datastore/super-mario-odyssey/types/buffer-queue-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetBufferQueues';

	private params = new List(new BufferQueueParam());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.params.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			params: this.params
		};
	}
}

export class Response {
	public static Name = 'GetBufferQueues';

	private pBufferQueueLst = new List(new List(new QBuffer()));
	private pResults = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pBufferQueueLst.extractFrom(stream);
		this.pResults.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pBufferQueueLst: this.pBufferQueueLst,
			pResults: this.pResults
		};
	}
}
