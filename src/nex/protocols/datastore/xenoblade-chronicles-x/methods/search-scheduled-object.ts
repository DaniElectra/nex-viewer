import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import DataStoreSearchParam from '@/nex/protocols/datastore/types/datastore-search-param';
import DataStoreMetaInfo from '@/nex/protocols/datastore/types/datastore-meta-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchScheduledObject';

	private param = new DataStoreSearchParam();

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
	public static Name = 'SearchScheduledObject';

	private objects = new List(new DataStoreMetaInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.objects.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			objects: this.objects
		};
	}
}
