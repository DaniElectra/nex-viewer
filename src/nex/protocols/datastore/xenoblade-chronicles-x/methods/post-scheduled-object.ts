import NEXByteStream from '@/nex/byte-stream';
import DateTime from '@/nex/types/datetime';
import UInt64 from '@/nex/types/uint64';
import DataStorePreparePostParam from '@/nex/protocols/datastore/types/datastore-prepare-post-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PostScheduledObject';

	private param = new DataStorePreparePostParam();
	private scheduledTime = new DateTime();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
		this.scheduledTime.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param,
			scheduledTime: this.scheduledTime
		};
	}
}

export class Response {
	public static Name = 'PostScheduledObject';

	private dataId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.dataId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dataId: this.dataId
		};
	}
}
